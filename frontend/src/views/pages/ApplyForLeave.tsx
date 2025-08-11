import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import applyForLeaveController from "../../controllers/ApplyForLeaveController";

type ApplyForLeaveProps = {
    onClose: () => void;
};

export default function ApplyForLeave({onClose}: ApplyForLeaveProps) {
    const {type, from, to, setType, setFrom, setTo, getDaysCount, applyForLeave} = applyForLeaveController(onClose);

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg mt-10">
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

                <h2 className="text-4xl font-bold text-neonBlue text-center mb-10">APPLY FOR LEAVE</h2>

                <form onSubmit={applyForLeave} className="space-y-8">

                    <select value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-darkBlue text-gray-400 border border-neonBlue rounded-lg px-6 py-3 focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                            required>
                        <option disabled value="">Leave Type</option>
                        <option value="annual">Annual</option>
                        <option value="casual">Casual</option>
                    </select>

                    <div className="flex space-x-10">
                        <div className="flex-1 min-w-0">
                            <DatePicker
                                selected={from}
                                onChange={(date) => setFrom(date)}
                                className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                                placeholderText="From Date"
                                dateFormat="yyyy-MM-dd"
                                required
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <DatePicker
                                selected={to}
                                onChange={(date) => setTo(date)}
                                className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue transition"
                                placeholderText="To Date"
                                dateFormat="yyyy-MM-dd"
                                required
                            />
                        </div>
                    </div>

                    {from && to && getDaysCount() > 0 && (
                        <div className="flex justify-center mt-4">
                            <div
                                className="inline-flex flex-col items-center px-6 py-3 rounded-xl bg-gradient-to-r from-neonBlue/40 to-neonBlue/30 border-2 border-neonBlue shadow-[0_0_10px_#00fff] text-neonBlue select-none min-w-[150px] relative">
                                <span className="text-sm font-bold uppercase drop-shadow-md mb-1">Total Days</span>
                                <span className="text-4xl font-extrabold drop-shadow-lg">{getDaysCount()}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button type="submit"
                                className="bg-neonBlue text-darkBlue py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300 px-10">Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}