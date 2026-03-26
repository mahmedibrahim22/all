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

  // 1. ربط الثيم بالـ HTML وتنعيم الانتقال
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

  // 2. إدارة التنبيهات مع السوكيت بشكل احترافي
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

  const isRolePage = location.pathname === "/";

  return (
    // 3. الخلفية هنا أصبحت أهدى (Slate-50 لليل و Dark-[#0b1120] لليوم) مع تنعيم حركة الألوان
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors duration-500 ease-in-out selection:bg-teal-500/30">
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme={darkMode ? "dark" : "light"}
        toastStyle={{ borderRadius: '12px' }}
      />
      
      {/* تأكد أن ScrollToTop موجود هنا ليعمل مع كل ROUTES */}
      <ScrollToTop />

      {/* الناف بار */}
      {!isRolePage && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}

      {/* 4. توزيع المحتوى بـ Padding علوي مناسب (pt-24) لمنع تداخل المحتوى مع الناف بار الثابت */}
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
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment/:docId" element={<Appointment />} />

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

          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-4xl font-bold text-slate-300 dark:text-slate-700">404</h2>
                <p className="text-slate-500">عذراً، الصفحة غير موجودة</p>
              </div>
            }
          />
        </Routes>
      </div>

      {!isRolePage && <Footer />}
    </div>
  );
};

export default App;