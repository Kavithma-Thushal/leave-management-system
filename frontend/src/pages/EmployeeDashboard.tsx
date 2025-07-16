import {useEffect, useState} from 'react';
import axios from 'axios';

export default function EmployeeDashboard() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setAccessToken(token);
    }, []);

    const handleApplyLeave = async () => {
        if (!accessToken) {
            setError('Access token missing. Please login again!');
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/v1/employee/apply-for-leave', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                },
            });

            setMessage(response.data.message);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to apply for leave.');
            setMessage(null);
        }
    };

    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Employee Dashboard</h1>
            <button onClick={handleApplyLeave}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Apply for Leave
            </button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
}