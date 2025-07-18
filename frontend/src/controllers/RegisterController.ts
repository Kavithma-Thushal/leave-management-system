import axios from 'axios';
import {useState} from 'react';
import {successNotification, errorNotification} from '../util/Alert';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default function registerController() {
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const register = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/register`, form);
            successNotification(response.data.message);
            setForm({name: '', email: '', password: ''});
        } catch (error: any) {
            errorNotification(Object.values(error.response?.data?.error));
        }
    };

    return {
        form,
        handleChange,
        register,
    };
}