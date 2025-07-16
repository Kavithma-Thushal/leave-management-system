import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to Leave Management</h1>
            <div className="flex space-x-4">
                <Link
                    to="/register"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Register
                </Link>
                <Link
                    to="/login"
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}