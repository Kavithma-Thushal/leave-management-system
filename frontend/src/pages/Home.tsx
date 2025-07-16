import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
            <div
                className="bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-4xl w-full text-center border border-white border-opacity-30">
                <h1 className="text-4xl font-extrabold text-black mb-6 drop-shadow-lg">
                    Welcome to Leave Management System
                </h1>
                <div className="flex justify-center gap-6 mt-10">
                    <Link to="/register"
                          className="bg-white text-blue-700 font-semibold px-6 py-2 rounded shadow hover:bg-blue-100 transition duration-300">Register</Link>
                    <Link to="/login"
                          className="bg-white text-green-700 font-semibold px-6 py-2 rounded shadow hover:bg-green-100 transition duration-300">Login</Link>
                </div>
            </div>
        </div>
    );
}