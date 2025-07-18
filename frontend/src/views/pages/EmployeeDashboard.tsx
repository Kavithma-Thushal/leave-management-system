import {useState} from "react";
import {Link} from "react-router-dom";
import ApplyForLeave from "./ApplyForLeave";
import employeeDashboardController from "../../controllers/EmployeeDashboardController";

export default function EmployeeDashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const {user} = employeeDashboardController();

    return (
        <div className="min-h-screen bg-darkBlue px-4 py-8 relative text-neonBlue">
            <h1 className="text-4xl font-bold mb-8 text-center drop-shadow">Employee Dashboard</h1>

            {user ? (
                <div
                    className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-neonBlue space-y-4">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Leave Balances:</h2>
                        <p>Annual: {user.leave_details?.annual}</p>
                        <p>Casual: {user.leave_details?.casual}</p>
                    </div>
                </div>
            ) : (
                <h1 className="text-center mt-72 text-lg">Loading...</h1>
            )}

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Link to="#"
                      onClick={(e) => {
                          e.preventDefault();
                          setShowPopup(true);
                      }}
                      className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300">Apply
                    For Leave
                </Link>
            </div>
            {showPopup && <ApplyForLeave onClose={() => setShowPopup(false)}/>}
        </div>
    );
}