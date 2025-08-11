import {BASE_URL} from '../config/api.ts';
import axios from "axios";
import {useState} from "react";
import {successNotification, errorNotification} from "../util/alert.ts";

export default function applyForLeaveController(onClose: () => void) {
    const [type, setType] = useState("");
    const [from, setFrom] = useState<Date | null>(null);
    const [to, setTo] = useState<Date | null>(null);

    const formatDate = (date: Date) => {
        return (
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0")
        );
    };

    const getDaysCount = () => {
        if (from && to) {
            const diffTime = to.getTime() - from.getTime();
            return diffTime >= 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 : 0;
        }
        return 0;
    };

    const applyForLeave = async (e: any) => {
        e.preventDefault();

        if (!from || !to || !type) {
            errorNotification("Please fill all fields!");
            return;
        }

        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.post(`${BASE_URL}/employee/apply-for-leave`,
                {
                    type: type,
                    from: formatDate(from),
                    to: formatDate(to),
                },
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            );

            successNotification(response.data.message);
            setType("");
            setFrom(null);
            setTo(null);
            onClose();
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        type,
        from,
        to,
        setType,
        setFrom,
        setTo,
        getDaysCount,
        applyForLeave,
    };
}