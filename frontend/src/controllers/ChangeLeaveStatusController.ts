import {BASE_URL} from '../config/api.ts';
import axios from 'axios';
import {errorNotification, successNotification} from '../util/alert.ts';

export default function ChangeLeaveStatusController() {
    const changeLeaveStatus = async (leaveId: number, status: string) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.patch(`${BASE_URL}/admin/change-leave-status/${leaveId}`,
                {status},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            successNotification(response.data.message);
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        changeLeaveStatus
    };
}