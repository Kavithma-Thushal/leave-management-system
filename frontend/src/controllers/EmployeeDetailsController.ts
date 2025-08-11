import {BASE_URL} from '../config/api.ts';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {errorNotification} from '../util/alert.ts';

export default function employeeDetailsController() {
    const [employeeDetails, setEmployeeDetails] = useState<any>([]);

    useEffect(() => {
        getEmployeeDetails();
    }, []);

    const getEmployeeDetails = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}/admin/get-employee-details`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setEmployeeDetails(Object.values(response.data.data));
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        employeeDetails,
        getEmployeeDetails
    };
}