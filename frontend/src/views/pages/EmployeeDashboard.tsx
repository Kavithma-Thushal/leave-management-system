import {Link} from "react-router-dom";
import {useState} from "react";
import ApplyForLeave from "./ApplyForLeave";
import leaveLogsController from "../../controllers/LeaveLogsController.ts";
import leaveDetailsController from "../../controllers/LeaveDetailsController.ts";

export default function EmployeeDashboard() {
    const [showPopup, setShowPopup] = useState(false);
    const {leaveLogs, fetchLeaveLogs} = leaveLogsController();
    const {leaveDetails, fetchLeaveDetails} = leaveDetailsController();

    return (
        <div className="min-h-screen bg-darkBlue py-6 text-neonBlue">
            <h1 className="text-4xl font-semibold mb-5 text-center mt-16">Employee Dashboard</h1>

            {leaveDetails ? (
                <div className="flex flex-col lg:flex-row gap-10 w-7xl mx-auto items-start ms-10 me-10 mt-8">

                    {/* Left Side - View Leave Logs */}
                    <div
                        className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-neonBlue space-y-6 flex-1 mb-10">
                        <h2 className="text-2xl font-semibold text-center mb-4">📕 View Leave Logs</h2>
                        {leaveLogs.length > 0 ? (
                            <div>
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
                                        <tr key={index}>
                                            <td className="px-4 py-2">{log.type}</td>
                                            <td className="px-4 py-2">{log.from}</td>
                                            <td className="px-4 py-2">{log.to}</td>
                                            <td className="px-4 py-2">{log.count}</td>
                                            <td className={`px-4 py-2 font-semibold ${
                                                log.status === 'pending' ? 'text-yellow-400' :
                                                    log.status === 'approved' ? 'text-green-400' :
                                                        'text-red-400'}`}>{log.status}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-300">No leave logs found!</p>
                        )}
                    </div>

                    {/* Right Side - Employee Details */}
                    <div
                        className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-neonBlue space-y-8 flex-1">
                        <h2 className="text-3xl font-semibold text-center">🤵‍♂️ Employee Details</h2>

                        <div className="flex flex-col sm:flex-row gap-6 text-lg font-medium">
                            <div className="p-4 rounded-lg border border-neonBlue bg-darkBlue bg-opacity-20 flex-1">
                                <p><span className="text-gray-300">Name:</span> {leaveDetails.name}</p>
                            </div>
                            <div className="p-4 rounded-lg border border-neonBlue bg-darkBlue bg-opacity-20 flex-1">
                                <p><span className="text-gray-300">Email:</span> {leaveDetails.email}</p>
                            </div>
                        </div>

                        <div className="border-t border-neonBlue pt-6">
                            <h2 className="text-2xl font-semibold text-center mb-5 drop-shadow">📋 Leave Balances</h2>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 text-lg font-semibold">
                                <div
                                    className="px-6 py-4 bg-darkBlue bg-opacity-20 rounded-xl border border-neonBlue text-center">
                                    <p className="text-gray-300 mb-2">Annual Leaves</p>
                                    <span className="text-2xl">{leaveDetails.leave_details.annual}</span>
                                </div>
                                <div
                                    className="px-6 py-4 bg-darkBlue bg-opacity-20 rounded-xl border border-neonBlue text-center">
                                    <p className="text-gray-300 mb-2">Casual Leaves</p>
                                    <span className="text-2xl">{leaveDetails.leave_details.casual}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Link to="#"
                                  className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      setShowPopup(true);
                                  }}>Apply For Leave</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center mt-60">
                    <div
                        className="w-16 h-16 border-4 border-neonBlue border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {showPopup && (
                <ApplyForLeave
                    onClose={() => {
                        setShowPopup(false);
                        fetchLeaveLogs();
                        fetchLeaveDetails();
                    }}
                />
            )}
        </div>
    );
}