import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SpecialityMenu = () => {
    const navigate = useNavigate()

    const specialityData = [
        { speciality: 'طبيب عام', image: 'https://cdn-icons-png.flaticon.com/512/387/387561.png' },
        { speciality: 'نساء وتوليد', image: 'https://cdn-icons-png.flaticon.com/512/2904/2904831.png' },
        { speciality: 'جلدية', image: 'https://cdn-icons-png.flaticon.com/512/2818/2818366.png' },
        { speciality: 'أطفال', image: 'https://cdn-icons-png.flaticon.com/512/3069/3069172.png' },
        { speciality: 'أعصاب', image: 'https://cdn-icons-png.flaticon.com/512/2105/2105151.png' },
        { speciality: 'جهاز هضمي', image: 'https://cdn-icons-png.flaticon.com/512/3138/3138981.png' },
    ]

    return (
        <div id='speciality' className='flex flex-col items-center gap-12 py-24 bg-white relative overflow-hidden' dir="rtl">
            
            {/* دوائر ضوئية خفيفة في الخلفية */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-50/40 via-transparent to-transparent -z-10'></div>

            {/* العنوان */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='text-center space-y-4 px-4'
            >
                <h2 className='text-4xl md:text-6xl font-black text-slate-900 tracking-tighter'>
                    تخصصات <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500'>عَوْن</span> الطبية
                </h2>
                <p className='max-w-xl mx-auto text-lg font-bold text-slate-400 leading-relaxed'>
                    اختر التخصص المطلوب ودعنا نساعدك في العثور على أفضل استشاري متاح الآن.
                </p>
            </motion.div>

            {/* الحاوية الخاصة بالأيقونات */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
                className='flex sm:justify-center gap-6 md:gap-10 pt-5 w-full overflow-x-auto px-10 no-scrollbar pb-10'
            >
                {specialityData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -10 }}
                        className='flex flex-col items-center gap-5 cursor-pointer flex-shrink-0 group'
                        onClick={() => { navigate(`/doctors/${item.speciality}`); window.scrollTo(0, 0) }}
                    >
                        {/* مربع الأيقونة الملون - تصميم Squircle */}
                        <div className='w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-[2.8rem] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.02)] group-hover:bg-teal-600 group-hover:shadow-[0_20px_40px_rgba(20,184,166,0.3)] transition-all duration-500 border border-slate-100 relative overflow-hidden'>
                            
                            <div className='absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                            
                            <img 
                                className='w-12 md:w-16 group-hover:invert group-hover:scale-110 transition-all duration-500 z-10' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                        </div>
                        
                        {/* اسم التخصص */}
                        <p className='text-xs md:text-sm font-black text-slate-600 group-hover:text-teal-700 transition-colors uppercase tracking-widest'>
                            {item.speciality}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* زر عرض الكل */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                className='relative group overflow-hidden bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-sm tracking-widest transition-all duration-300 shadow-2xl hover:shadow-teal-200'
            >
                <span className='relative z-10'>عرض جميع التخصصات</span>
                <div className='absolute inset-0 bg-teal-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300'></div>
            </motion.button>
        </div>
    )
}

export default SpecialityMenu