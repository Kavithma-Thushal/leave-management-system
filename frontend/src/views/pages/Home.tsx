import {Link} from 'react-router-dom';
import homeController from '../../controllers/HomeController';

export default function Home() {
    homeController(); // Automatically redirect if access_token is found

    return (
        <div className="flex items-center justify-center min-h-screen bg-darkBlue text-neonBlue">
            <div className="text-center space-y-8 max-w-3xl w-full">
                <h1 className="text-4xl sm:text-5xl font-bold drop-shadow">Welcome to Leave Management System</h1>
                <p className="text-lg text-gray-200">Manage your leaves efficiently with a simple and secure system.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                    <Link to="/login"
                          className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300">Let's
                        go</Link>
                </div>
            </div>
        </div>
    );
}