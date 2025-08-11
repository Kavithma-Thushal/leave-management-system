import {useEffect} from 'react';
import Chart from '../components/Chart.tsx';
import employeeDetailsController from '../../controllers/EmployeeDetailsController.ts';
import changeLeaveStatusController from '../../controllers/ChangeLeaveStatusController';

export default function AdminDashboard() {
    const {employeeDetails, getEmployeeDetails} = employeeDetailsController();
    const {changeLeaveStatus} = changeLeaveStatusController();

    useEffect(() => {
        getEmployeeDetails();
    }, []);

    const handleChangeStatus = async (leaveId: number, status: string) => {
        await changeLeaveStatus(leaveId, status);
        await getEmployeeDetails();
    };

    return (
        <div className="min-h-screen bg-darkBlue px-4 py-8 text-neonBlue">
            <h1 className="text-4xl font-semibold text-center mt-16 mb-6">Admin Dashboard</h1>

            {employeeDetails.length > 0 ? (
                <div className="max-w-7xl mx-auto overflow-x-auto">

                    <table className="w-full text-left border border-neonBlue text-neonBlue text-sm sm:text-base">
                        <thead>
                        <tr className="bg-neonBlue text-darkBlue">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Joined</th>
                            <th className="px-4 py-3">Annual</th>
                            <th className="px-4 py-3">Casual</th>
                            <th className="px-4 py-3 text-center">Leaves Logs</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeDetails.map((employee) => (
                            <tr key={employee.id} className="border-t border-neonBlue hover:bg-darkBlue">
                                <td className="px-4 py-3">{employee.name}</td>
                                <td className="px-4 py-3">{employee.email}</td>
                                <td className="px-4 py-3">{new Date(employee.created_at).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-center">{employee.leave_details?.annual ?? 0}</td>
                                <td className="px-4 py-3 text-center">{employee.leave_details?.casual ?? 0}</td>
                                <td className="px-4 py-3">{employee.leave_logs.length > 0 ? (

                                    <table className="w-full border border-neonBlue text-neonBlue text-sm sm:text-sm">
                                        <thead>
                                        <tr className="bg-neonBlue text-darkBlue">
                                            <th className="px-2 py-1">Type</th>
                                            <th className="px-2 py-1">From</th>
                                            <th className="px-2 py-1">To</th>
                                            <th className="px-2 py-1">Days</th>
                                            <th className="px-2 py-1">Status</th>
                                            <th className="px-2 py-1 text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>{employee.leave_logs.map((log: any) => (
                                            <tr key={log.id} className="border-t border-neonBlue">
                                                <td className="px-2 py-1">{log.type}</td>
                                                <td className="px-2 py-1">{log.from}</td>
                                                <td className="px-2 py-1">{log.to}</td>
                                                <td className="px-2 py-1 text-center">{log.count}</td>
                                                <td className={`px-2 py-1 font-semibold ${
                                                    log.status === 'pending' ? 'text-yellow-400' :
                                                        log.status === 'approved' ? 'text-green-400' :
                                                            'text-red-400'}`}>{log.status}
                                                </td>
                                                <td className="px-2 py-1 text-center space-x-2">
                                                    {log.status === 'pending' ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleChangeStatus(log.id, 'approved')}
                                                                className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-sm text-white">
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleChangeStatus(log.id, 'rejected')}
                                                                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm text-white">
                                                                Reject
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-400 italic">No actions</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
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
                <div className="flex justify-center mt-60">
                    <div
                        className="w-16 h-16 border-4 border-neonBlue border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <Chart employees={employeeDetails}/>
        </div>
    );
}