import {useState} from 'react';
import {register} from '../../services/authService.ts';

export default function Register() {
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(form);
            alert('Registered successfully!');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Registration failed!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000a1f] px-4">
            <div
                className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-3xl p-12 w-[600px] border border-neonBlue border-opacity-50">
                <h2 className="text-4xl font-bold text-neonBlue drop-shadow-lg text-center mb-10 tracking-wide">
                    REGISTER
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="w-full bg-[#00102f] text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue focus:border-transparent transition"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full bg-[#00102f] text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue focus:border-transparent transition"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full bg-[#00102f] text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue focus:border-transparent transition"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-neonBlue text-darkBlue px-3 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300 w-full"
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    );
}