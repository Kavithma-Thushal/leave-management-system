import {BASE_URL} from '../config/api.ts';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {errorNotification} from '../util/alert.ts';

export default function LeaveLogsController() {
    const [leaveLogs, setLeaveLogs] = useState<any[]>([]);

    useEffect(() => {
        fetchLeaveLogs();
    }, []);

    const fetchLeaveLogs = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}/employee/get-leave-logs`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setLeaveLogs(response.data.data);

        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        leaveLogs,
        fetchLeaveLogs
    };
}