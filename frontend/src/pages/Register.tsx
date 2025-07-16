import {useState} from 'react';
import {register} from '../services/authService';

export default function Register() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(form);
            alert('Registered successfully!');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed!');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 p-6">
            <div
                className="bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-md w-full border border-white border-opacity-30">
                <h2 className="text-3xl font-extrabold text-black mb-8 drop-shadow-lg text-center">Register</h2>
                {error && (
                    <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="w-full bg-white bg-opacity-70 border border-gray-300 rounded px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
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
                            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition duration-300 w-full">Register
                    </button>
                </form>
            </div>
        </div>
    );
}