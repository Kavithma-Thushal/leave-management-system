import registerController from '../../controllers/RegisterController.ts';

export default function Register() {
    const {form, handleChange, register} = registerController();

    return (
        <div className="min-h-screen flex items-center justify-center bg-darkBlue px-4">
            <div
                className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-2xl p-12 w-[600px] border border-neonBlue border-opacity-50">
                <h2 className="text-4xl font-bold text-neonBlue drop-shadow-lg text-center mb-10 tracking-wide">REGISTER</h2>
                <form onSubmit={register} className="space-y-8">
                    <input
                        name="name"
                        placeholder="Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-darkBlue text-neonBlue border border-neonBlue rounded-lg px-6 py-3 shadow-inner focus:outline-none focus:ring-4 focus:ring-neonBlue focus:border-transparent transition"
                    />
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
                    <button type="submit"
                            className="bg-neonBlue text-darkBlue px-3 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition duration-300 w-full">REGISTER
                    </button>
                </form>
            </div>
        </div>
    );
}