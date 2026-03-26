import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='mx-4 md:mx-14 py-20 overflow-hidden' dir="rtl">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                // تعديل الخلفية لتناسب الوضعين: في اللايت مود رمادي فاتح جداً، وفي الدارك مود كحلي غامق
                className='flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] px-8 md:px-20 relative border border-slate-200/60 dark:border-slate-800/50 shadow-sm'
            >
                
                {/* إضاءات خلفية ناعمة جداً */}
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute top-0 right-0 w-64 h-64 bg-teal-400/5 rounded-full blur-[100px]' />
                    <div className='absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-[100px]' />
                </div>
                
                {/* المحتوى النصي */}
                <div className='flex-1 z-10 py-16 md:py-24 flex flex-col items-start justify-center gap-6'>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className='space-y-4'
                    >
                        <h2 className='text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight'>
                            ابدأ رحلة <span className='text-teal-500'>عَوْن</span> <br /> 
                            <span className='text-slate-400 dark:text-slate-500 font-bold text-3xl md:text-5xl'>واطمن على صحتك</span>
                        </h2>
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className='text-slate-500 dark:text-slate-400 text-lg font-medium max-w-md leading-relaxed'
                    >
                        تجربة حجز ذكية، سريعة، وبأمان تام لخصوصيتك. انضم لآلاف الذين وثقوا بـ <span className='text-teal-600 dark:text-teal-400 font-bold'>عَوْن</span>.
                    </motion.p>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0) }} 
                        className='bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 px-12 py-4 rounded-2xl font-black text-base transition-all duration-300 shadow-xl shadow-slate-200 dark:shadow-none flex items-center gap-3 mt-4'
                    >
                        أنشئ حسابك الآن
                        <span className='text-xl'>←</span>
                    </motion.button>
                </div>

                {/* صورة الطبيب */}
                <div className='hidden lg:flex w-1/3 relative h-full self-end items-end justify-center pt-10'>
                    <motion.img 
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className='w-full object-contain z-20 brightness-105 dark:brightness-90 drop-shadow-[-20px_20px_50px_rgba(0,0,0,0.1)]' 
                        src={assets.appointment_img} 
                        alt="Appointment" 
                    />
                </div>

            </motion.div>

            {/* شريط الحالة السفلي */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mt-10"
            >
                <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] md:text-xs font-bold tracking-wide uppercase">
                        نظام الحجز الذكي متوفر الآن في كافة محافظات مصر
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Banner