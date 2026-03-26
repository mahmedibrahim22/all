import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const RoleSelection = () => {
    const navigate = useNavigate()

    // رابط صفحة اللوجين في مشروع الأدمين
    const ADMIN_LOGIN_URL = "http://localhost:5174/login"

    const handleDoctorRedirect = () => {
        // بنمسح التوكن عشان نجبر السيستم يفتح صفحة اللوجين وميدخلش عالداشبورد علطول
        // تأكد أن الاسم 'dToken' أو 'adminToken' هو نفس الاسم اللي بتستخدمه في مشروع الأدمين
        localStorage.removeItem('dToken'); 
        localStorage.removeItem('adminToken'); 
        
        // التحويل لصفحة اللوجين
        window.location.href = ADMIN_LOGIN_URL;
    };

    return (
        <div className='min-h-screen flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-500 bg-[#f8fafc] dark:bg-[#0b1120]' dir="rtl">
            
            {/* إضاءات خلفية ناعمة */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className='w-full max-w-5xl z-10'>
                {/* رأس الصفحة */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='text-center mb-16'
                >
                    <motion.h1 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className='text-4xl md:text-6xl font-black tracking-tight mb-4 text-slate-900 dark:text-white'
                    >
                        مرحباً بك في <span className='text-teal-500 drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]'>عَوْن</span>
                    </motion.h1>
                    <p className='text-slate-500 dark:text-slate-400 font-bold text-lg max-w-xl mx-auto'>
                        يرجى اختيار نوع الحساب للمتابعة في رحلة الرعاية الصحية
                    </p>
                </motion.div>

                {/* خيارات الأدوار */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                    
                    {/* بطاقة المستفيد */}
                    <motion.div 
                        whileHover={{ y: -12, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/home')}
                        className='group cursor-pointer p-10 rounded-[3.5rem] text-center transition-all duration-500 bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl shadow-slate-200/30 dark:shadow-none hover:border-teal-500/50 dark:hover:border-teal-500/50'
                    >
                        <div className='w-24 h-24 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-500/20 dark:to-teal-500/5 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 group-hover:rotate-6 transition-transform duration-500 shadow-inner'>
                            👤
                        </div>
                        <h3 className='text-3xl font-black mb-4 text-slate-800 dark:text-white'>مستفيد</h3>
                        <p className='text-slate-500 dark:text-slate-400 font-medium mb-10 text-base leading-relaxed'>
                            احجز موعدك بسهولة وتابع حالتك الصحية مع أكفأ الأطباء في أسرع وقت.
                        </p>
                        <div className='py-4 px-10 rounded-2xl font-black text-sm transition-all bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 group-hover:bg-teal-600 dark:group-hover:bg-teal-400 shadow-lg shadow-teal-500/20'>
                            دخول كمستخدم
                        </div>
                    </motion.div>

                    {/* بطاقة الطبيب */}
                    <motion.div 
                        whileHover={{ y: -12, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDoctorRedirect}
                        className='group cursor-pointer p-10 rounded-[3.5rem] text-center transition-all duration-500 bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-2xl shadow-slate-200/30 dark:shadow-none hover:border-indigo-500/50 dark:hover:border-indigo-500/50'
                    >
                        <div className='w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-500/20 dark:to-indigo-500/5 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 group-hover:-rotate-6 transition-transform duration-500 shadow-inner'>
                            👨‍⚕️
                        </div>
                        <h3 className='text-3xl font-black mb-4 text-slate-800 dark:text-white'>طبيب</h3>
                        <p className='text-slate-500 dark:text-slate-400 font-medium mb-10 text-base leading-relaxed'>
                            نظام متكامل لإدارة عيادتك ومواعيد المرضى باحترافية وسهولة تامة.
                        </p>
                        <div className='py-4 px-10 rounded-2xl font-black text-sm transition-all border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-lg group-hover:shadow-indigo-500/30'>
                            بوابة الأطباء
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default RoleSelection