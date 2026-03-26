import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets' 

const Header = () => {
    const images = {
        headerDoctor: "https://www.pngarts.com/files/3/Doctor-PNG-Image-Transparent.png", 
        arrowIcon: "https://cdn-icons-png.flaticon.com/512/2989/2989988.png" 
    }

    return (
        <div className='relative min-h-[550px] md:min-h-[650px] overflow-hidden bg-[#0f172a] dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 rounded-[2.5rem] md:rounded-[4rem] px-6 md:px-16 lg:px-20 py-12 flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-black/20'>
            
            {/* إضاءة خلفية هادئة جداً */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
            </div>

            {/* الجانب الأيمن: المحتوى النصي */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='md:w-1/2 flex flex-col items-start gap-6 z-20 text-right'
            >
                {/* Badge احترافي بسيط */}
                <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 rounded-full">
                    <span className="flex h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]"></span>
                    <span className="text-teal-400 text-[10px] font-bold tracking-wider uppercase">
                        منصة عَوْن: رعاية تثق بها 🇪🇬
                    </span>
                </div>

                <h1 className='text-4xl md:text-6xl lg:text-7xl text-white font-black leading-[1.2] tracking-tight'>
                    نحن <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-teal-400 to-white">
                        العَوْنُ لَك
                    </span>
                </h1>
                
                <p className='text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-md'>
                    في <span className="text-teal-400 font-bold text-xl">عَوْن</span>، نؤمن أن الوصول للطبيب لا يجب أن يكون معركة. احجز موعدك الآن مع نخبة من أطباء مصر في ثوانٍ.
                </p>

                {/* زر الحركة السيمبل */}
                <motion.a 
                    whileHover={{ scale: 1.02, backgroundColor: '#14b8a6' }}
                    whileTap={{ scale: 0.98 }}
                    href='#speciality' 
                    className='group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-base transition-all duration-300 shadow-lg shadow-white/5'
                >
                    اكتشف التخصصات
                    <img className='w-4 group-hover:translate-x-[-4px] transition-transform duration-300 rotate-180' src={images.arrowIcon} alt="arrow" />
                </motion.a>
            </motion.div>

            {/* الجانب الأيسر: صورة الطبيب والعناصر العائمة */}
            <div className='md:w-1/2 flex justify-center relative mt-8 md:mt-0'>
                
                {/* كارت "مستعدون" - تصميم أنحف وأهدى */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-4 bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-xl z-30 hidden lg:flex items-center gap-3"
                >
                    <div className='w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center text-lg'>🩺</div>
                    <div>
                        <p className="text-white/40 text-[9px] font-bold uppercase">جاهزون</p>
                        <p className="text-white text-sm font-black">دائماً</p>
                    </div>
                </motion.div>

                {/* صورة الطبيب بظل ناعم جداً */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-20"
                >
                    <img 
                        className='w-[300px] md:w-[400px] lg:w-[480px] object-contain drop-shadow-2xl' 
                        src={images.headerDoctor} 
                        alt="Doctor" 
                    />
                </motion.div>

                {/* كارت التقييم - تصميم سيمبل جداً */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 right-4 bg-white p-4 rounded-3xl shadow-2xl z-30 hidden lg:block border border-slate-100"
                >
                    <div className="flex gap-0.5 mb-1.5">
                        {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-[10px]">⭐</span>)}
                    </div>
                    <p className="text-slate-800 font-bold text-xs leading-tight text-right italic">
                        "تجربة حجز سهلة وسريعة"
                    </p>
                    <div className="h-[1px] w-8 bg-teal-500 mt-2 ml-auto"></div>
                </motion.div>

            </div>
        </div>
    )
}

export default Header