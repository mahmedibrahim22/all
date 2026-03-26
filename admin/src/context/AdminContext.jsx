import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]); 
    const [dashData, setDashData] = useState(false); 
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // مزامنة التوكن مع التخزين المحلي
    useEffect(() => {
        if (aToken) {
            localStorage.setItem('aToken', aToken);
        } else {
            localStorage.removeItem('aToken');
        }
    }, [aToken]);

    // ✅ تعديل: الهيدرز تقرأ مباشرة لضمان أحدث قيمة
    const getAdminHeaders = () => {
        const token = aToken || localStorage.getItem('aToken');
        return { headers: { atoken: token } };
    };

    const adminSessionExpiredToast = () => {
        toast.error(
            <div className="flex flex-col gap-2">
                <span>جلسة الأدمن انتهت، سجل دخول مجدداً</span>
                <button 
                    onClick={() => {
                        setAToken('');
                        window.location.href = '/'; 
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded shadow-sm text-xs font-bold"
                >
                    العودة لتسجيل الدخول
                </button>
            </div>,
            { autoClose: false, closeOnClick: false, toastId: 'admin-session' }
        );
    };

    const getAllDoctors = async () => {
        if (!aToken && !localStorage.getItem('aToken')) return; // منع الطلبات الفارغة
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', getAdminHeaders());
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                if (data.message === "Unauthorized Login Again") adminSessionExpiredToast();
                else toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAllAppointments = async () => {
        if (!aToken && !localStorage.getItem('aToken')) return;
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', getAdminHeaders());
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                if (data.message === "Unauthorized Login Again") adminSessionExpiredToast();
                else toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getDashData = async () => {
        if (!aToken && !localStorage.getItem('aToken')) return;
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', getAdminHeaders());
            if (data.success) {
                setDashData(data.dashData);
            } else {
                if (data.message === "Unauthorized Login Again") adminSessionExpiredToast();
                else toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const adminLogout = () => {
        setAToken('');
    };

    const value = {
        aToken, setAToken, backendUrl,
        appointments, getAllAppointments,
        doctors, getAllDoctors,
        dashData, getDashData, adminLogout
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;