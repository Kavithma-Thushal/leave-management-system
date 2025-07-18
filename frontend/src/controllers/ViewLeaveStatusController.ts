import {useState, useEffect} from 'react';
import axios from 'axios';
import {errorNotification} from '../util/Alert';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default function viewLeaveStatusController() {
    const [leaveLogs, setLeaveLogs] = useState([]);

    useEffect(() => {
        getLeaveStatus();
    }, []);

    const getLeaveStatus = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}/employee/view-leave-status`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLeaveLogs(response.data.data);
        } catch (error: any) {
            errorNotification("Failed to load leave statuses.");
        }
    };

    return {
        leaveLogs,
        getLeaveStatus
    };
}