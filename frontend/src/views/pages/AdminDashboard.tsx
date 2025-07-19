import {useEffect, useState} from 'react';
import adminDashboardController from '../../controllers/AdminDashboardController';
import changeLeaveStatusController from '../../controllers/ChangeLeaveStatusController';

export default function AdminDashboard() {
    const {employees, getAllEmployees} = adminDashboardController();
    const {loading, changeLeaveStatus} = changeLeaveStatusController();

    // Track loading states per leaveLogId to disable buttons individually
    const [loadingIds, setLoadingIds] = useState<number[]>([]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    // Helper to handle status change and manage loading state for a single leave log
    const handleChangeStatus = async (leaveLogId: number, status: 'Approved' | 'Rejected') => {
        setLoadingIds((prev) => [...prev, leaveLogId]);
        await changeLeaveStatus(leaveLogId, status);
        setLoadingIds((prev) => prev.filter((id) => id !== leaveLogId));
        getAllEmployees();
    };

    return (
        <div className="min-h-screen bg-darkBlue px-4 py-8 text-neonBlue">
            <h1 className="text-4xl font-bold mb-12 text-center drop-shadow">Admin Dashboard</h1>

            {employees.length > 0 ? (
                <div className="max-w-7xl mx-auto overflow-x-auto">
                    <table className="w-full text-left border border-neonBlue text-neonBlue text-sm sm:text-base">
                        <thead>
                        <tr className="bg-neonBlue text-darkBlue">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Joined</th>
                            <th className="px-4 py-3">Annual</th>
                            <th className="px-4 py-3">Casual</th>
                            <th className="px-4 py-3 text-center">Leave Logs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((emp) => (
                            <tr
                                key={emp.id}
                                className="border-t border-neonBlue hover:bg-darkBlue hover:bg-opacity-20 transition"
                            >
                                <td className="px-4 py-3">{emp.name}</td>
                                <td className="px-4 py-3">{emp.email}</td>
                                <td className="px-4 py-3">{new Date(emp.created_at).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-center">{emp.leave_details?.annual ?? 0}</td>
                                <td className="px-4 py-3 text-center">{emp.leave_details?.casual ?? 0}</td>
                                <td className="px-4 py-3">
                                    {emp.leave_logs.length > 0 ? (
                                        <table
                                            className="w-full border border-neonBlue text-neonBlue text-xs sm:text-sm">
                                            <thead>
                                            <tr className="bg-neonBlue text-darkBlue">
                                                <th className="px-2 py-1">Type</th>
                                                <th className="px-2 py-1">From</th>
                                                <th className="px-2 py-1">To</th>
                                                <th className="px-2 py-1">Days</th>
                                                <th className="px-2 py-1">Status</th>
                                                <th className="px-2 py-1 text-center">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {emp.leave_logs.map((log: any) => {
                                                const isLoading = loadingIds.includes(log.id);
                                                return (
                                                    <tr key={log.id} className="border-t border-neonBlue">
                                                        <td className="px-2 py-1 capitalize">{log.leave_type}</td>
                                                        <td className="px-2 py-1">{log.from_date}</td>
                                                        <td className="px-2 py-1">{log.to_date}</td>
                                                        <td className="px-2 py-1 text-center">{log.count}</td>
                                                        <td
                                                            className={`px-2 py-1 font-semibold ${
                                                                log.status === 'Pending'
                                                                    ? 'text-yellow-400'
                                                                    : log.status === 'Approved'
                                                                        ? 'text-green-400'
                                                                        : 'text-red-400'
                                                            }`}
                                                        >
                                                            {log.status}
                                                        </td>
                                                        <td className="px-2 py-1 text-center space-x-2">
                                                            {log.status === 'Pending' ? (
                                                                <>
                                                                    <button
                                                                        disabled={isLoading}
                                                                        onClick={() => handleChangeStatus(log.id, 'Approved')}
                                                                        className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-sm text-white">
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        disabled={isLoading}
                                                                        onClick={() => handleChangeStatus(log.id, 'Rejected')}
                                                                        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm text-white">
                                                                        Reject
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <span className="text-gray-400 italic">No actions</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-300 text-center">No leave logs</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1 className="text-center mt-72 text-neonBlue text-4xl animate-pulse">Loading .....</h1>
            )}
        </div>
    );
}