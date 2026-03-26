import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/UserSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userData } = useSelector((state) => state.user);
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-6 md:px-16 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between" dir="rtl">
        {/* اللوجو - يوجه الآن إلى صفحة الهوم /home */}
        <img
          onClick={() => navigate("/home")}
          className="w-24 md:w-32 cursor-pointer hover:opacity-80 transition-all dark:brightness-110"
          src="/logo.png"
          alt="عون"
        />

        {/* روابط التنقل */}
        <ul className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-slate-600 dark:text-slate-300">
          {/* رابط بوابة الدخول - يوجه للمسار الرئيسي / */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-teal-600 dark:text-teal-400" : "hover:text-teal-600 transition-colors"
            }
          >
            <li>بوابة الدخول</li>
          </NavLink>

          {/* الرئيسية - توجه الآن إلى /home */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "text-teal-600 dark:text-teal-400" : "hover:text-teal-600 transition-colors"
            }
          >
            <li>الرئيسية</li>
          </NavLink>

          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "text-teal-600 dark:text-teal-400" : "hover:text-teal-600 transition-colors"
            }
          >
            <li>كل الأطباء</li>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-teal-600 dark:text-teal-400" : "hover:text-teal-600 transition-colors"
            }
          >
            <li>عن عَوْن</li>
          </NavLink>
        </ul>

        <div className="flex items-center gap-4">
          {/* زر تبديل المود */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-teal-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <svg
                className={`absolute w-5 h-5 transition-all duration-500 transform ${
                  darkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              <svg
                className={`absolute w-5 h-5 transition-all duration-500 transform ${
                  !darkMode ? "opacity-0 -rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
          </button>

          {token ? (
            <div 
              className="relative py-2"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer bg-white dark:bg-slate-800 p-1 pr-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:block">
                  {userData?.name || "حسابي"}
                </p>
                <img
                  className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-700"
                  src={userData?.image || assets.profile_pic}
                  alt="profile"
                />
              </div>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl py-2 border border-slate-100 dark:border-slate-700 z-[1100]"
                  >
                    <p
                      onClick={() => { navigate("/my-profile"); setShowMenu(false); }}
                      className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-sm transition-colors font-medium text-right"
                    >
                      بروفايلي
                    </p>
                    <p
                      onClick={() => { navigate("/my-appointments"); setShowMenu(false); }}
                      className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-sm transition-colors font-medium text-right"
                    >
                      مواعيدي
                    </p>
                    <hr className="my-1 border-slate-100 dark:border-slate-700" />
                    <p
                      onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                      }}
                      className="px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-bold cursor-pointer text-sm transition-colors text-right"
                    >
                      تسجيل الخروج
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-600 text-white px-7 py-2.5 rounded-xl font-bold text-xs hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20"
            >
              تسجيل الدخول
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;