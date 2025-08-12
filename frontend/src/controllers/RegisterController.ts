import {BASE_URL} from '../config/api.ts';
import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {successNotification, errorNotification} from '../util/alert.ts';

export default function RegisterController() {
    const navigate = useNavigate();
    const [form, setForm] = useState({name: '', email: '', password: '', password_confirmation: ''});

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        if (form.name.length < 4) {
            errorNotification('The name field must be at least 4 characters.');
            return false;
        }
        if (form.password.length < 6) {
            errorNotification('The password field must be at least 6 characters.');
            return false;
        }
        if (form.password_confirmation !== form.password) {
            errorNotification('The password field confirmation does not match.');
            return false;
        }
        return true;
    };

    const register = async (e: any) => {
        e.preventDefault();
        if (!validateForm()) return;
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