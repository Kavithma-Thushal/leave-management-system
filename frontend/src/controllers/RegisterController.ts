import {BASE_URL} from '../config/api.ts';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {successNotification, errorNotification} from '../util/alert.ts';

export default function registerController() {
    const navigate = useNavigate();
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const register = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/register`, form);
            successNotification(response.data.message);
            navigate('/login');
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        form,
        handleChange,
        register,
    };
}