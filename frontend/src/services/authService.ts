import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Register
export const register = (data: { name: string; email: string; password: string }) => {
    return axios.post(`${BASE_URL}/register`, data, {
        headers: {
            Accept: 'application/json',
        },
    });
};

// Login
export const login = async (
    data: { email: string; password: string },
    onSuccess: (user: any) => void,
    onError: (errorMessage: string) => void
) => {
    try {
        // First, login and get token
        const response = await axios.post(`${BASE_URL}/login`, data, {
            headers: {
                Accept: 'application/json',
            },
        });

        const access_token = response.data.data.access_token;
        localStorage.setItem('access_token', access_token);

        // Then, fetch the user role
        const userResponse = await axios.get(`${BASE_URL}/employee/get-role`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json',
            },
        });

        const user = userResponse.data.data;
        onSuccess(user);

    } catch (error: any) {
        const message = error.response?.data?.message || 'Login failed. Please try again!';
        onError(message);
    }
};