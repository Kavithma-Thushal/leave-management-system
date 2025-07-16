import {useState} from 'react';
import {login} from '../services/authService';
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
            () => {
                navigate('/employee-dashboard');
            },
            (errorMsg) => {
                setError(errorMsg);
            }
        );
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
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
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
                    Login
                </button>
            </form>
        </div>
    );
}