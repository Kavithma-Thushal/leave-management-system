import {useState} from "react";
import {Link} from "react-router-dom";
import ApplyForLeave from "./ApplyForLeave";
import employeeDashboardController from "../../controllers/EmployeeDashboardController";

export default function EmployeeDashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const {user, userDetails} = employeeDashboardController();

    return (
        <div
            className="min-h-screen bg-darkBlue px-4 py-8 relative text-neonBlue flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8 text-center drop-shadow">Employee Dashboard</h1>

            {user ? (
                <div
                    className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-neonBlue space-y-8">
                    <h2 className="text-3xl font-semibold text-center drop-shadow mb-6">👤 Employee Details</h2>

                    <div className="grid sm:grid-cols-2 gap-6 text-lg font-medium">
                        <div className="p-4 rounded-lg border border-neonBlue bg-darkBlue bg-opacity-20 shadow-inner">
                            <p><span className="text-gray-300">Name:</span> {user.name}</p>
                        </div>
                        <div className="p-4 rounded-lg border border-neonBlue bg-darkBlue bg-opacity-20 shadow-inner">
                            <p><span className="text-gray-300">Email:</span> {user.email}</p>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-neonBlue pt-6">
                        <h2 className="text-2xl font-semibold text-center mb-4 drop-shadow">📋 Leave Balances</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 text-lg font-semibold">
                            <div
                                className="px-6 py-4 bg-darkBlue bg-opacity-30 rounded-xl border border-neonBlue text-center hover:scale-105 transition">
                                <p className="text-gray-300 mb-2">Annual Leave</p>
                                <span className="text-2xl">{user.leave_details?.annual}</span>
                            </div>
                            <div
                                className="px-6 py-4 bg-darkBlue bg-opacity-30 rounded-xl border border-neonBlue text-center hover:scale-105 transition">
                                <p className="text-gray-300 mb-2">Casual Leave</p>
                                <span className="text-2xl">{user.leave_details?.casual}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="text-center mt-72 text-neonBlue text-lg animate-pulse">Loading...</h1>
            )}

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Link
                    to="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowPopup(true);
                    }}
                    className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
                >
                    Apply For Leave
                </Link>
            </div>

            {showPopup && <ApplyForLeave onClose={() => {
                setShowPopup(false);
                userDetails();
            }}/>}
        </div>
    );
}