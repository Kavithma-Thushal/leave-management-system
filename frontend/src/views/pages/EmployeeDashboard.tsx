import {useState} from "react";
import {Link} from "react-router-dom";
import ApplyForLeave from "./ApplyForLeave";
import employeeDashboardController from "../../controllers/EmployeeDashboardController";
import viewLeaveStatusController from "../../controllers/ViewLeaveStatusController";

export default function EmployeeDashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const {user, userDetails} = employeeDashboardController();
    const {leaveLogs, getLeaveStatus} = viewLeaveStatusController();

    return (
        <div className="min-h-screen bg-darkBlue px-4 py-8 text-neonBlue">
            <h1 className="text-4xl font-bold mb-10 text-center drop-shadow mt-12">Employee Dashboard</h1>

            {user ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-start mb-12">
                    {/* Right Side - Leave Logs */}
                    <div
                        className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-neonBlue space-y-6">
                        <h2 className="text-2xl font-semibold text-center drop-shadow mb-4">📕 View Leaves</h2>

                        {leaveLogs.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table
                                    className="w-full text-left border border-neonBlue text-neonBlue text-sm sm:text-base">
                                    <thead>
                                    <tr className="bg-neonBlue text-darkBlue">
                                        <th className="px-4 py-2">Type</th>
                                        <th className="px-4 py-2">From</th>
                                        <th className="px-4 py-2">To</th>
                                        <th className="px-4 py-2">Days</th>
                                        <th className="px-4 py-2">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {leaveLogs.map((log, index) => (
                                        <tr key={index} className="hover:bg-darkBlue hover:bg-opacity-20 transition">
                                            <td className="px-4 py-2 capitalize">{log.leave_type}</td>
                                            <td className="px-4 py-2">{log.from_date}</td>
                                            <td className="px-4 py-2">{log.to_date}</td>
                                            <td className="px-4 py-2">{log.count}</td>
                                            <td className={`px-4 py-2 font-semibold ${
                                                log.status === 'Pending' ? 'text-yellow-400' :
                                                    log.status === 'Approved' ? 'text-green-400' :
                                                        'text-red-400'
                                            }`}>
                                                {log.status}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-300">Currently no leave logs found!</p>
                        )}
                    </div>

                    {/* Left Side - Employee Details */}
                    <div
                        className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-neonBlue space-y-8">
                        <h2 className="text-3xl font-semibold text-center drop-shadow">🤵‍♂️ Employee Details</h2>

                        <div className="grid sm:grid-cols-2 gap-6 text-lg font-medium">
                            <div
                                className="p-4 rounded-lg border border-neonBlue bg-darkBlue bg-opacity-20 shadow-inner">
                                <p><span className="text-gray-300">Name:</span> {user.name}</p>
                            </div>
                            <div
                                className="p-4 rounded-lg border border-neonBlue bg-darkBlue bg-opacity-20 shadow-inner">
                                <p><span className="text-gray-300">Email:</span> {user.email}</p>
                            </div>
                        </div>

                        <div className="border-t border-neonBlue pt-6">
                            <h2 className="text-2xl font-semibold text-center mb-4 drop-shadow">📋 Leave Balances</h2>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 text-lg font-semibold">
                                <div
                                    className="px-6 py-4 bg-darkBlue bg-opacity-30 rounded-xl border border-neonBlue text-center hover:scale-105 transition">
                                    <p className="text-gray-300 mb-2">Annual Leave</p><span
                                    className="text-2xl">{user.leave_details?.annual}</span>
                                </div>
                                <div
                                    className="px-6 py-4 bg-darkBlue bg-opacity-30 rounded-xl border border-neonBlue text-center hover:scale-105 transition">
                                    <p className="text-gray-300 mb-2">Casual Leave</p><span
                                    className="text-2xl">{user.leave_details?.casual}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Link to="#"
                                  className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      setShowPopup(true);
                                  }}>Apply For Leave
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="text-center mt-72 text-neonBlue text-4xl animate-pulse">Loading .....</h1>
            )}

            {showPopup && <ApplyForLeave onClose={() => {
                setShowPopup(false);
                userDetails();
                getLeaveStatus();
            }}/>}

        </div>
    );
}