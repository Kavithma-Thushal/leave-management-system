import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {errorNotification} from '../util/Alert';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default function employeeDashboardController() {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        userDetails();
    }, []);

    const userDetails = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}/employee/get-details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data.data);
        } catch (error: any) {
            errorNotification('Failed to load user details. Please try again!');
            if (error.response?.status === 401) {
                localStorage.removeItem('access_token');
                navigate('/login');
            }
        }
    };

    return {
        user,
    };
}