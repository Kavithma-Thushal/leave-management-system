import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Auto set Authorization header for future requests
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const register = (data: { name: string; email: string; password: string }) =>
    api.post('/register', data);

export const login = async (
    data: { email: string; password: string },
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        const response = await api.post('/login', data);
        const access_token = response.data.data.access_token;

        // Store token
        localStorage.setItem('access_token', access_token);
        setAuthToken(access_token);

        // Call success callback (e.g. to redirect)
        onSuccess();
    } catch (error: any) {
        const message =
            error.response?.data?.message || 'Login failed. Please try again.';
        onError(message);
    }
};