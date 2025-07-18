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

            const userData = response.data.data;
            if (userData.role !== 'employee') {
                errorNotification('Only employees can access this page!');
                localStorage.removeItem('access_token');
                navigate('/');
                return;
            }

            setUser(userData);

        } catch (error: any) {
            errorNotification('Failed to load user details. Please try again!');
            if (error.response?.status === 401) {
                localStorage.removeItem('access_token');
                navigate('/');
            }
        }
    };

    return {
        user,
        userDetails
    };
}