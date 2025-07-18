import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {errorNotification} from '../util/Alert';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default function adminDashboardController() {
    const [employees, setEmployees] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}/admin/view-all-leave-status`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Convert the returned object to array for easy mapping
            const dataObj = response.data.data;
            const employeesArray = Object.values(dataObj);
            setEmployees(employeesArray);
        } catch (error: any) {
            errorNotification('Failed to load employees. Please try again!');
            if (error.response?.status === 401) {
                localStorage.removeItem('access_token');
                navigate('/');
            }
        }
    };

    return {
        employees,
        getAllEmployees,
    };
}