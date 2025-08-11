import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import logo from "../../assets/logo.svg";

export function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Show or hide Logout button
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const loggedIn = !!token && (location.pathname === "/employee-dashboard" || location.pathname === "/admin-dashboard");
        setIsLoggedIn(loggedIn);
    }, [location.pathname]);

    // Logout button
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="bg-darkBlue text-gray-200 p-2 fixed w-full z-50">
            <div className="w-full flex justify-between items-center px-4">
                <a href="/" className="flex items-center" rel="noopener noreferrer">
                    <img src={logo} className="mr-3 mt-2 w-16" alt="Nav-logo"/>
                    <div className="text-2xl font-semibold">LEAVE MANAGEMENT SYSTEM</div>
                </a>
                <div className="hidden lg:flex space-x-5 text-1xl font-semibold">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}
                                className="bg-darkBlue text-neonRed border border-neonRed px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300">LOGOUT</button>
                    ) : (
                        <>
                            <Link to="/register"
                                  className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300">REGISTER</Link>
                            <Link to="/login"
                                  className="bg-neonBlue text-darkBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300">LOGIN</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}