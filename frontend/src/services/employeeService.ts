import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v1/employee";

export const applyForLeave = async (leaveData: {
    leave_type: string;
    from_date: string;
    to_date: string;
}) => {
    const token = localStorage.getItem("access_token");

    const response = await axios.post(`${BASE_URL}/apply-for-leave`, leaveData, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

    return response.data;
};