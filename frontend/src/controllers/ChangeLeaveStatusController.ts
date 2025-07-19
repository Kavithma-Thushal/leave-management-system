import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {errorNotification, successNotification} from '../util/Alert';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default function changeLeaveStatusController() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeLeaveStatus = async (leaveLogId: number, status: 'Approved' | 'Rejected') => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');

            if (!token) {
                errorNotification('Unauthorized: Please login.');
                navigate('/');
                setLoading(false);
                return;
            }

            await axios.post(`${BASE_URL}/admin/change-leave-status`,
                {leave_log_id: leaveLogId, status},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            successNotification(`Leave has been ${status.toLowerCase()} successfully!`);
        } catch (error: any) {
            if (error.response?.status === 401) {
                localStorage.removeItem('access_token');
                navigate('/');
                errorNotification('Session expired. Please login again.');
            } else if (error.response?.data?.error) {
                errorNotification(error.response.data.error);
            } else {
                errorNotification('Failed to change leave status. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        changeLeaveStatus
    };
}