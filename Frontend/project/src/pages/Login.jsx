import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setToken } from "../store/slices/UserSlice";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backendUrl, token } = useSelector((state) => state.user);

  const toggleState = (newState) => {
    setState(newState);
    setEmail("");
    setPassword("");
    setName("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === "Sign Up" && name.trim().length < 3) {
      return toast.warn("الاسم يجب أن يكون أكثر من 3 أحرف");
    }

    try {
      const endpoint = state === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const payload = state === "Sign Up" ? { name: name.trim(), password, email: email.trim() } : { password, email: email.trim() };
      
      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        toast.success(state === "Sign Up" ? `أهلاً بك - تم إنشاء حسابك بنجاح` : "تم تسجيل الدخول بنجاح");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "حدث خطأ في الاتصال";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden bg-[#fbfcfd] dark:bg-[#0b1120]">
      
      {/* دوائر خلفية هادئة جداً */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[5%] w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[500px] h-[500px] bg-slate-400/5 dark:bg-slate-400/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[460px]"
      >
        <form 
          onSubmit={onSubmitHandler} 
          className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 dark:shadow-none"
          dir="rtl"
        >
          <div className="text-right mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
              {state === "Sign Up" ? "إنشاء حساب" : "تسجيل دخول"}
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-bold text-sm">
              {state === "Sign Up" ? "انضم إلى عَوْن وابدأ رحلة الرعاية الصحية" : "مرحباً بك مجدداً، يسعدنا رؤيتك"}
            </p>
          </div>

          <div className="space-y-5">
            <AnimatePresence mode="wait">
              {state === "Sign Up" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pr-2">الاسم بالكامل</label>
                  <input
                    className="w-full p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 focus:bg-white dark:focus:bg-slate-800 focus:border-teal-500 outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
                    type="text"
                    placeholder="محمد إبراهيم عبدالله"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pr-2">البريد الإلكتروني</label>
              <input
                className="w-full p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 focus:bg-white dark:focus:bg-slate-800 focus:border-teal-500 outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pr-2">كلمة المرور</label>
              <input
                className="w-full p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 focus:bg-white dark:focus:bg-slate-800 focus:border-teal-500 outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4.5 rounded-2xl text-base font-black shadow-lg shadow-slate-200 dark:shadow-none hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 mt-10"
          >
            {state === "Sign Up" ? "ابدأ الآن مجاناً" : "تسجيل الدخول"}
          </motion.button>

          <div className="mt-8 text-center">
            <p className="text-slate-400 dark:text-slate-500 font-bold text-sm">
              {state === "Sign Up" ? "لديك حساب بالفعل؟ " : "ليس لديك حساب بعد؟ "}
              <span 
                onClick={() => toggleState(state === "Sign Up" ? "Login" : "Sign Up")} 
                className="text-teal-600 dark:text-teal-400 cursor-pointer font-black border-b border-teal-100 dark:border-teal-900 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                {state === "Sign Up" ? "سجل دخولك" : "انضم إلينا الآن"}
              </span>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;