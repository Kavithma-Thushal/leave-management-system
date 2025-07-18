import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default function homeController() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await axios.get(`${BASE_URL}/login`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const role = response.data.data;
                    if (role === 'admin') {
                        navigate('/admin-dashboard');
                    } else {
                        navigate('/employee-dashboard');
                    }
                } catch (error) {
                    localStorage.removeItem('access_token');
                }
            }
        };

        checkToken();
    }, [navigate]);
}