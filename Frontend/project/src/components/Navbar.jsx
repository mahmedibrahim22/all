import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/UserSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, userData } = useSelector((state) => state.user);
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const navLinkClass = ({ isActive }) =>
    `relative py-1 transition-all duration-300 whitespace-nowrap ${
      isActive
        ? "text-teal-600 dark:text-teal-400 font-black"
        : "hover:text-teal-600 dark:hover:text-teal-400 opacity-90 hover:opacity-100"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-4 px-6 text-sm font-bold border-r-4 transition-all ${
      isActive
        ? "bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-600"
        : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-4 md:px-12 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      {/* 🆕 تم تغيير max-w لـ 1400px لضمان مساحة واسعة في الشاشات الكبيرة */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between" dir="rtl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowMobileMenu(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <img
            onClick={() => navigate("/home")}
            className="w-35 md:w-45 cursor-pointer hover:opacity-80 transition-all dark:brightness-110"
            src="/logo.png"
            alt="عون"
          />
        </div>

        {/* 🆕 روابط الديسكتوب - تم توسيع الـ gap لـ 10 والخط لـ 14px لشكل أهدى وأشيك */}
        <ul className="hidden lg:flex items-center gap-10 text-[14px] font-bold text-slate-600 dark:text-slate-300">
          <NavLink to="/home" className={navLinkClass}><li>الرئيسية</li></NavLink>
          <NavLink to="/doctors" className={navLinkClass}><li>كل الأطباء</li></NavLink>
          <NavLink to="/pharmacies" className={navLinkClass}><li>الصيدليات</li></NavLink>
          
          <NavLink to="/pharmacies" className={navLinkClass}>
             <li className="flex items-center gap-1.5 relative">
               <span>الدليفري</span>
               {/* Badge سيمبل جداً للإشارة للخدمة الجديدة */}
               <span className="absolute -top-3 -left-4 bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 text-[9px] px-1.5 py-0.5 rounded-full font-black border border-teal-200 dark:border-teal-800">
                NEW
               </span>
             </li>
          </NavLink>
          
          <NavLink to="/labs" className={navLinkClass}><li>المعامل</li></NavLink>
          <NavLink to="/about" className={navLinkClass}><li>عن عَوْن</li></NavLink>
          <NavLink to="/" className={navLinkClass}><li>بوابة الدخول</li></NavLink>
        </ul>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-teal-400 border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </div>
          </button>

          {token ? (
            <div className="relative py-2" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
              <div className="flex items-center gap-3 cursor-pointer bg-white dark:bg-slate-800 p-1.5 pr-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:block">{userData?.name || "حسابي"}</p>
                <img className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-50 dark:ring-slate-700" src={userData?.image || assets.profile_pic} alt="profile" />
              </div>
              <AnimatePresence>
                {showMenu && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 shadow-xl rounded-2xl py-2 border border-slate-100 dark:border-slate-700 z-[1100]">
                    <p onClick={() => navigate("/my-profile")} className="px-5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-right">بروفايلي</p>
                    <p onClick={() => navigate("/my-appointments")} className="px-5 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-right">مواعيدي</p>
                    <hr className="my-1 border-slate-100 dark:border-slate-700" />
                    <p onClick={() => { dispatch(logout()); navigate("/login"); }} className="px-5 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-bold cursor-pointer text-sm text-right">تسجيل الخروج</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="bg-teal-600 text-white px-7 py-2.5 rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/10 active:scale-95">تسجيل الدخول</button>
          )}
        </div>
      </div>

      {/* القائمة الجانبية للموبايل - تم تحسين الـ Spacing والـ Spring animation */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMobileMenu(false)} className="fixed inset-0 bg-slate-900/40 z-[1100] lg:hidden backdrop-blur-[2px]" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-[#0f172a] z-[1200] lg:hidden shadow-2xl py-8"
              dir="rtl"
            >
              <div className="flex items-center justify-between px-6 mb-10">
                <img className="w-24 dark:brightness-110" src="/logo.png" alt="عون" />
                <button onClick={() => setShowMobileMenu(false)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                <NavLink onClick={() => setShowMobileMenu(false)} to="/home" className={mobileNavLinkClass}>الرئيسية</NavLink>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/doctors" className={mobileNavLinkClass}>كل الأطباء</NavLink>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/pharmacies" className={mobileNavLinkClass}>الصيدليات</NavLink>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/pharmacies" className={mobileNavLinkClass}>
                  <div className="flex items-center justify-between w-full">
                    <span>خدمة الدليفري</span>
                    <span className="bg-teal-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">جديد</span>
                  </div>
                </NavLink>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/labs" className={mobileNavLinkClass}>المعامل</NavLink>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/about" className={mobileNavLinkClass}>عن عَوْن</NavLink>
                <NavLink onClick={() => setShowMobileMenu(false)} to="/" className={mobileNavLinkClass}>بوابة الدخول</NavLink>
              </nav>

              <div className="absolute bottom-10 left-6 right-6">
                 {!token && (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setShowMobileMenu(false);
                      }}
                      className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-teal-700 shadow-lg shadow-teal-500/20"
                    >
                      تسجيل الدخول
                    </button>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;