import {Link} from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Navbar.css";

export function Navbar() {
    return (
        <nav className="bg-darkBlue text-white p-2 fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#" className="flex items-center" rel="noopener noreferrer">
                    <img src={logo} className="Nav-logo ml-5 mr-5 mt-2" alt="Nav-logo"/>
                    <div className="text-2xl font-bold">
                        LEAVE MANAGEMENT SYSTEM
                    </div>
                </a>

                <div className="hidden lg:flex space-x-5 mr-2 text-1xl font-semibold">
                    <Link to="/register"
                          className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300">REGISTER</Link>
                    <Link to="/login"
                          className="bg-neonBlue text-darkBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300">LOGIN</Link>
                </div>
            </div>
        </nav>
    );
}