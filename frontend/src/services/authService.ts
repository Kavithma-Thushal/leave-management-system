import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
});

// Register
export const register = (
    data: { name: string; email: string; password: string }) =>
    api.post('/register', data);

// Login
export const login = async (
    data: { email: string; password: string },
    onSuccess: (user: any) => void,
    onError: (errorMessage: string) => void
) => {
    try {
        // First, login and get token
        const response = await api.post('/login', data);
        const access_token = response.data.data.access_token;
        localStorage.setItem('access_token', access_token);

        // Then, fetch the full user with role
        const userResponse = await api.get('/employee/get-role', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const user = userResponse.data.data;
        onSuccess(user);

    } catch (error: any) {
        const message = error.response?.data?.message || 'Login failed. Please try again!';
        onError(message);
    }
};