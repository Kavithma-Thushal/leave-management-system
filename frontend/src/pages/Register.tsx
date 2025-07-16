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
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Register
                </button>
            </form>
        </div>
    );
}