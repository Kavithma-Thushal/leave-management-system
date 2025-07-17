import { useState } from "react";
import { Link } from "react-router-dom";
import ApplyForLeave from "./ApplyForLeave";

export default function EmployeeDashboard() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="min-h-screen bg-darkBlue px-4 relative">
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Link
                    to="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowPopup(true);
                    }}
                    className="bg-darkBlue text-neonBlue border border-neonBlue px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
                >
                    Apply For Leave
                </Link>
            </div>

            <div className="flex items-center justify-center min-h-screen">
            </div>

            {showPopup && <ApplyForLeave onClose={() => setShowPopup(false)} />}
        </div>
    );
}