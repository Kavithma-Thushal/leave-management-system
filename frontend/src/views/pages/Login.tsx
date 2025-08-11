import loginController from '../../controllers/LoginController';

export default function Login() {
    const {form, handleChange, login} = loginController();

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkBlue px-4">
            <div
                className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-2xl p-12 w-[600px] border border-neonBlue border-opacity-50">
                <h2 className="text-4xl font-bold text-neonBlue drop-shadow-lg text-center mb-10 tracking-wide">LOGIN</h2>
                <form onSubmit={login} className="space-y-8">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue focus:border-transparent transition"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue focus:border-transparent transition"
                    />
                    <div className="flex justify-center">
                        <button type="submit"
                                className="bg-neonBlue text-darkBlue py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300 mt-2 px-10">LOGIN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}