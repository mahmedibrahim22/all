import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useSelector(state => state.doctor)
    const navigate = useNavigate()
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    if (relDoc.length === 0) return null;

    return (
        <div className='flex flex-col items-center gap-12 my-32 px-6 md:px-14' dir="rtl">
            
            {/* عنوان القسم بتصميم هادئ واحترافي */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='w-full text-right'
            >
                <div className='flex items-center gap-3 mb-4'>
                    <div className="w-10 h-[2px] bg-teal-500 rounded-full"></div>
                    <h2 className='text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight'>
                        أطباء <span className='text-teal-500'>مقترحون</span>
                    </h2>
                </div>
                <p className='text-slate-400 dark:text-slate-500 text-base md:text-lg font-bold max-w-2xl'>
                    نخبة من المتخصصين في <span className='text-slate-900 dark:text-slate-300'>{speciality}</span> جاهزون لتقديم العَوْن لك.
                </p>
            </motion.div>

            {/* شبكة الأطباء */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {relDoc.slice(0, 4).map((item, index) => (
                    <motion.div 
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
                        className='group bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500' 
                    >
                        {/* حاوية الصورة السيمبل */}
                        <div className='relative h-72 overflow-hidden bg-slate-50 dark:bg-slate-800/50'>
                            <img 
                                className='w-full h-full object-cover object-top brightness-105 dark:brightness-90 transition-transform duration-700 group-hover:scale-110' 
                                src={item.image} 
                                alt={item.name} 
                            />
                            
                            {/* شارة التوافر بتصميم Minimalist */}
                            <div className='absolute top-4 right-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-2xl flex items-center gap-2 shadow-sm border border-slate-100 dark:border-slate-800'>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-teal-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                <span className='text-[10px] font-black text-slate-800 dark:text-slate-200'>
                                    {item.available ? 'متاح الآن' : 'غير متاح'}
                                </span>
                            </div>
                        </div>

                        {/* بيانات الطبيب */}
                        <div className='p-6 text-right'>
                            <p className='text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-[0.15em] mb-2'>
                                {item.speciality}
                            </p>
                            <h3 className='text-xl font-black text-slate-800 dark:text-white group-hover:text-teal-500 transition-colors duration-300'>
                                {item.name}
                            </h3>
                            
                            {/* زر تفاعلي يظهر عند الهوفر */}
                            <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xs font-bold text-slate-400">احجز الآن</span>
                                <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600">
                                    <span className="text-lg">←</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* زر الاستكشاف بتصميم راقي */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
                className='mt-8 px-10 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black text-sm hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300 flex items-center gap-3'
            >
                استكشف كافة الأطباء
                <span className='text-xl'>→</span>
            </motion.button>
        </div>
    )
}

export default RelatedDoctors