import {useState} from 'react';
import {login} from '../../services/authService.ts';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({email: '', password: ''});
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        login(
            form,
            (user) => {
                if (user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            },
            (errorMsg) => {
                setError(errorMsg);
            }
        );
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 p-6">
            <div
                className="bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-md w-full border border-white border-opacity-30">
                <h2 className="text-3xl font-extrabold text-black mb-8 drop-shadow-lg text-center">Login</h2>
                {error && (
                    <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        onChange={handleChange}
                        className="w-full bg-white bg-opacity-70 border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full bg-white bg-opacity-70 border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        required
                    />
                    <button type="submit"
                            className="bg-green-500 text-white font-semibold px-6 py-3 rounded shadow hover:bg-green-600 transition duration-300 w-full">Login
                    </button>
                </form>
            </div>
        </div>
    );
}