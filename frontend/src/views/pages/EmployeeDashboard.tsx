import {useState} from "react";
import {applyForLeave} from "../../services/employeeService.ts";

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
        <div className="min-h-screen flex items-center justify-center bg-[#000a1f] px-4">
            <div
                className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-3xl p-12 w-[600px] border border-neonBlue border-opacity-50">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-neonBlue drop-shadow text-center mb-8">
                    Employee Dashboard
                </h1>

                <h2 className="text-2xl font-semibold text-neonBlue text-center drop-shadow mb-6">
                    Apply for Leave
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full bg-[#00102f] text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                    >
                        <option value="annual">Annual</option>
                        <option value="casual">Casual</option>
                    </select>

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full bg-[#00102f] text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                        required
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full bg-[#00102f] text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-neonBlue text-darkBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300 w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}