import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dashData, setDashData] = useState(false);

  // اكتبه كدة بالظبط
  const backendUrl = "http://localhost:4000";

  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  // ✅ دالة موحدة لجلب الهيدرز (lowercase لضمان التوافق مع الباك إيند)
  const getAdminHeaders = () => {
    const token = aToken || localStorage.getItem("aToken");
    return {
      headers: {
        atoken: token,
      },
    };
  };

  const getAllDoctors = async () => {
    try {
      // أضفنا ?t= لإجبار المتصفح على طلب بيانات جديدة
      const res = await axios.get(
        `${backendUrl}/api/admin/all-doctors?t=${Date.now()}`,
        getAdminHeaders(),
      );

      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/appointments",
        getAdminHeaders(),
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/dashboard",
        getAdminHeaders(),
      );
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
        setDashData(false); // ✅ السبنر هيقف هنا
      }
    } catch (error) {
      console.log(error);
      setDashData(false); // ✅ السبنر لازم يقفل هنا
    }
  };

  const adminLogout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    appointments,
    getAllAppointments,
    doctors,
    getAllDoctors,
    dashData,
    getDashData,
    adminLogout,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
