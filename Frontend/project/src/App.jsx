import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loadUserProfile } from "./store/slices/UserSlice";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import Appointment from "./pages/Appointment.jsx";
import RoleSelection from "./pages/RoleSelection.jsx";

// 🆕 استيراد الصفحات الجديدة (تأكد من وجود الملفات في فولدر pages)
import Pharmacies from "./pages/Pharmacies.jsx";
import Medicine from "./pages/Medicine.jsx";
import Labs from "./pages/Labs.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

const socket = io("http://localhost:4000");

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token, userData } = useSelector((state) => state.user);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (token) {
      dispatch(loadUserProfile());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (userData?._id) {
      socket.emit("join_room", userData._id);
      socket.on("appointment_status", (data) => {
        toast.success(data.message, {
          theme: darkMode ? "dark" : "light",
          icon: "🔔",
        });
      });
    }
    return () => socket.off("appointment_status");
  }, [userData, darkMode]);

  // التحقق إذا كنا في صفحة اختيار الدور أو صفحات الهبوط التي لا تحتاج Navbar
  const isRolePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors duration-500 ease-in-out selection:bg-teal-500/30">
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
        toastStyle={{ borderRadius: '12px' }}
      />
      
      <ScrollToTop />

      {/* عرض الـ Navbar فقط إذا لم نكن في صفحة اختيار الدور */}
      {!isRolePage && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}

      <div 
        className={`${
          !isRolePage 
            ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-10 min-h-[85vh]" 
            : "w-full"
        }`}
      >
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/home" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          
          {/* 🆕 مسارات الخدمات الطبية المضافة (عون) */}
          <Route path="/pharmacies" element={<Pharmacies />} />
          <Route path="/medicine/:id" element={<Medicine />} />
          <Route path="/labs" element={<Labs />} />

          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment/:docId" element={<Appointment />} />

          {/* المسارات المحمية */}
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            }
          />

          {/* صفحة 404 احترافية */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center py-20 text-right">
                <div className="text-9xl font-black text-slate-200 dark:text-slate-800 animate-pulse">404</div>
                <h2 className="text-2xl font-bold text-slate-400 -mt-8 mb-4">الصفحة غير موجودة</h2>
                <p className="text-slate-500 font-medium">عذراً، الرابط الذي تحاول الوصول إليه غير متاح حالياً</p>
              </div>
            }
          />
        </Routes>
      </div>

      {/* عرض الـ Footer فقط إذا لم نكن في صفحة اختيار الدور */}
      {!isRolePage && <Footer />}
    </div>
  );
};

export default App;