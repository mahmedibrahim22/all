import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const TopDoctors = () => {
    // جلب الدكاترة وحالة التحميل من الريدكس
    const { doctors = [], status } = useSelector(state => state.doctor || {})
    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    // حالة التحميل (اختياري لو حابب تظهر Skeleton)
    if (status === 'loading' && doctors.length === 0) {
        return <div className="text-center my-20 font-bold text-slate-500">جاري تحميل الأطباء...</div>
    }

    return (
        <div className='flex flex-col items-center gap-10 my-24 text-gray-900 px-6 md:mx-10'>
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='text-center space-y-3'
            >
                <h1 className='text-4xl md:text-6xl font-black text-slate-900 tracking-tighter'>
                    نخبة الأطباء <span className='text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500'>المتميزين</span>
                </h1>
                <p className='max-w-md mx-auto text-lg font-bold text-slate-400'>
                    تصفح قائمتنا من الأطباء الأكثر كفاءة واحجز موعدك بكل ثقة.
                </p>
            </motion.div>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-5'
            >
                {doctors.slice(0, 8).map((item, index) => (
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -12 }}
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
                        key={index} 
                        className='relative group bg-white rounded-[2.5rem] overflow-hidden cursor-pointer border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(20,184,166,0.1)] transition-all duration-500'
                    >
                        <div className='relative h-72 overflow-hidden bg-slate-50'>
                            <img 
                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
                                src={item.image} 
                                alt={item.name} 
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            
                            {/* شارة النشاط: بتعتمد على الـ Availability من الداتا بيز */}
                            <div className='absolute top-5 right-5 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-sm'>
                                <span className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full animate-pulse`}></span>
                                <span className='text-[10px] font-black text-slate-800 uppercase tracking-widest'>
                                    {item.available ? 'Active' : 'Busy'}
                                </span>
                            </div>
                        </div>

                        <div className='p-6 text-right space-y-2'>
                            <p className='text-teal-600 text-[11px] font-black uppercase tracking-[0.2em]'>
                                {item.speciality}
                            </p>
                            <h3 className='text-xl font-black text-slate-900 group-hover:text-teal-700 transition-colors'>
                                {item.name}
                            </h3>
                            
                            <div className='pt-4 flex justify-start'>
                                <div className='w-10 h-10 bg-slate-50 group-hover:bg-teal-600 rounded-2xl flex items-center justify-center transition-all duration-500'>
                                    <span className='text-slate-400 group-hover:text-white transition-colors'>←</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
                className='relative overflow-hidden bg-slate-950 text-white px-16 py-5 rounded-[2rem] font-black text-sm tracking-widest shadow-2xl hover:shadow-teal-100 transition-all group'
            >
                <span className='relative z-10'>استكشف جميع الأطباء</span>
                <div className='absolute inset-0 bg-teal-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500'></div>
            </motion.button>
        </div>
    )
}

export default TopDoctors