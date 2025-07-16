export default function EmployeeDashboard() {
    return (
        <div
            className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 p-6">
            <h1 className="text-5xl font-extrabold text-black drop-shadow-lg m-10 ">Employee Dashboard</h1>

            <div
                className="bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-7xl w-full border border-white border-opacity-30">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        {title: "Total Leaves", value: 12, color: "text-blue-700"},
                        {title: "Pending Requests", value: 3, color: "text-yellow-600"},
                        {title: "Approved Leaves", value: 9, color: "text-green-700"},
                    ].map(({title, value, color}) => (
                        <div key={title}
                             className="bg-white bg-opacity-30 rounded-xl p-6 shadow-md border border-white border-opacity-20 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                            <h2 className="text-xl font-semibold text-black mb-2">{title}</h2>
                            <p className={`text-3xl font-bold ${color}`}>{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}