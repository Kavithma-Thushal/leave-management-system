import axios from "axios";
import {useState} from "react";
import {successNotification, errorNotification} from "../util/Alert";

const BASE_URL = "http://127.0.0.1:8000/api/v1/employee";

export default function applyForLeaveController(onClose: () => void) {
    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    const applyForLeave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fromDate || !toDate || !leaveType) {
            errorNotification("Please fill all fields.");
            return;
        }

        try {
            const access_token = localStorage.getItem("access_token");
            const response = await axios.post(`${BASE_URL}/apply-for-leave`,
                {
                    leave_type: leaveType,
                    from_date: fromDate.toISOString().slice(0, 10),
                    to_date: toDate.toISOString().slice(0, 10),
                },
                {
                    headers: {Authorization: `Bearer ${access_token}`,},
                }
            );

            successNotification(response.data.message);
            setLeaveType("");
            setFromDate(null);
            setToDate(null);
            onClose();
        } catch (error: any) {
            errorNotification(Object.values(error.response?.data?.error));
        }
    };

    return {
        leaveType,
        fromDate,
        toDate,
        setLeaveType,
        setFromDate,
        setToDate,
        applyForLeave,
    };
}