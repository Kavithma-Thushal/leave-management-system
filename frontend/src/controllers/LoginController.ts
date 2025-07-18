import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {successNotification, errorNotification} from '../util/Alert';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default function loginController() {
    const [form, setForm] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const login = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/login`, form);
            successNotification(response.data.message);

            const access_token = response.data.data.access_token;
            localStorage.setItem('access_token', access_token);

            const userResponse = await axios.get(`${BASE_URL}/employee/get-role`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            const role = userResponse.data.data;

            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/employee-dashboard');
            }
        } catch (error: any) {
            errorNotification(Object.values(error.response?.data?.error));
        }
    };

    return {
        form,
        handleChange,
        login,
    };
}