import {useState} from "react";
import {applyForLeave} from "../services/employeeService";

export default function EmployeeDashboard() {
    const [leaveType, setLeaveType] = useState("casual");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await applyForLeave({
                leave_type: leaveType,
                from_date: fromDate,
                to_date: toDate,
            });

            alert(response.message);
            setLeaveType("casual");
            setFromDate("");
            setToDate("");
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || "Something went wrong!";
            alert(errorMsg);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 p-6">
            <div
                className="bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-2xl w-full border border-white border-opacity-30">
                <h1 className="text-3xl font-extrabold text-black mb-8 drop-shadow-lg text-center">
                    Employee Dashboard
                </h1>

                <h2 className="text-2xl font-semibold mb-6 text-black text-center drop-shadow">
                    Apply for Leave
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full bg-white bg-opacity-70 border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        <option value="casual">Casual</option>
                        <option value="annual">Annual</option>
                        <option value="sick">Sick</option>
                    </select>

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full bg-white bg-opacity-70 border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        required
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full bg-white bg-opacity-70 border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded shadow hover:bg-blue-600 transition duration-300 w-full"
                    >
                        Submit Leave Request
                    </button>
                </form>
            </div>
        </div>
    );
}