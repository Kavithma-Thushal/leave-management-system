import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import applyForLeaveController from "../../controllers/ApplyForLeaveController";

type ApplyForLeaveProps = {
    onClose: () => void;
};

export default function ApplyForLeave({onClose}: ApplyForLeaveProps) {
    const {
        leaveType,
        fromDate,
        toDate,
        setLeaveType,
        setFromDate,
        setToDate,
        applyForLeave,
    } = applyForLeaveController(onClose);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-2xl p-12 w-[500px] border border-neonBlue border-opacity-50 relative"
                role="dialog" aria-modal="true">
                <button onClick={onClose} aria-label="Close"
                        className="absolute top-4 right-4 p-2 border-2 border-neonRed rounded-lg text-neonRed font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <h1 className="text-3xl sm:text-4xl font-bold text-neonBlue drop-shadow text-center mb-12">Apply For
                    Leave</h1>

                <form onSubmit={applyForLeave} className="space-y-8">
                    <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                        required>
                        <option disabled value="">Leave Type</option>
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

                    <button type="submit"
                            className="bg-neonBlue text-darkBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300 w-full">Submit
                    </button>
                </form>
            </div>
        </div>
    );
}