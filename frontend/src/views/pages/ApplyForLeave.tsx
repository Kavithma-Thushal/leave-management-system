import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {applyForLeave} from "../../services/employeeService.ts";

type ApplyForLeaveProps = {
    onClose: () => void;
};

export default function ApplyForLeave({onClose}: ApplyForLeaveProps) {
    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fromDate || !toDate || !leaveType) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const response = await applyForLeave({
                leave_type: leaveType,
                from_date: fromDate.toISOString().slice(0, 10),
                to_date: toDate.toISOString().slice(0, 10),
            });

            alert(response.message);
            setLeaveType("");
            setFromDate(null);
            setToDate(null);
            onClose();
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || "Something went wrong!";
            alert(errorMsg);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-3xl p-12 w-[600px] border border-neonBlue border-opacity-50 relative"
                role="dialog"
                aria-modal="true"
            >
                <button
                    className="absolute top-4 right-4 text-neonBlue font-bold text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>

                <h1 className="text-3xl sm:text-4xl font-bold text-neonBlue drop-shadow text-center mb-12">
                    Apply For Leave
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                        required
                    >
                        <option disabled value="">
                            Leave Type
                        </option>
                        <option value="annual">Annual</option>
                        <option value="casual">Casual</option>
                    </select>

                    <div className="flex space-x-10">
                        <DatePicker
                            selected={fromDate}
                            onChange={(date) => setFromDate(date)}
                            className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                            placeholderText="From Date"
                            required
                            dateFormat="yyyy-MM-dd"
                        />

                        <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                            placeholderText="To Date"
                            required
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>

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