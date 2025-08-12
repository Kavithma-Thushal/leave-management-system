import {BASE_URL} from '../config/api.ts';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {errorNotification} from '../util/alert.ts';

export default function LeaveDetailsController() {
    const [leaveDetails, setLeaveDetails] = useState(null);

    useEffect(() => {
        fetchLeaveDetails();
    }, []);

    const fetchLeaveDetails = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}/employee/get-leave-details`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setLeaveDetails(response.data.data);

        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        leaveDetails,
        fetchLeaveDetails
    };
}