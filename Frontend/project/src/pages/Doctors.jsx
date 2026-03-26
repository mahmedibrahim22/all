import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const doctors = useSelector((state) => state.doctors.doctors || []);
  const navigate = useNavigate()
  const { speciality } = useParams()

  // فلترة ذكية تتعامل مع المسافات والحروف
  const filteredDoctors = speciality 
    ? doctors.filter(doc => doc.speciality.trim().toLowerCase() === speciality.trim().toLowerCase()) 
    : doctors

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className='py-20 px-6 max-w-7xl mx-auto relative' dir="rtl">
      {/* إضاءة خلفية خافتة جداً */}
      <div className='absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[120px] -z-10'></div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className='text-right mb-20'
      >
        <h1 className='text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight'>
          نخبة الأطباء <span className='text-teal-500'>المعتمدين</span>
        </h1>
        <p className='text-slate-400 dark:text-slate-500 font-bold text-lg max-w-2xl'>
            تصفح قائمة الأطباء المتخصصين واحجز موعدك بكل سهولة وأمان.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'
      >
        {filteredDoctors.length > 0 ? filteredDoctors.map((item, index) => (
          <motion.div 
            key={item._id}
            variants={itemVariants}
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0,0) }} 
            className='group bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500'
          >
            {/* حاوية الصورة مع تصميم هادي */}
            <div className='relative h-80 overflow-hidden bg-slate-50 dark:bg-slate-800/50'>
                {/* تقييم الطبيب */}
                <div className='absolute top-5 right-5 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-1.5'>
                    <span className='text-yellow-400 text-xs'>⭐</span>
                    <span className='text-[10px] font-black text-slate-700 dark:text-slate-200'>4.9</span> 
                </div>

              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className='w-full h-full object-cover object-top brightness-105 dark:brightness-90 transition-all' 
                src={item.image} 
                alt={item.name} 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            </div>

            <div className='p-8 text-right'>
              <div className='flex items-center gap-3 mb-4'>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-teal-500 animate-pulse' : 'bg-slate-300'}`}></span>
                <p className='text-teal-600 dark:text-teal-400 font-black text-[10px] uppercase tracking-widest bg-teal-50 dark:bg-teal-500/10 px-3 py-1 rounded-lg'>
                    {item.speciality}
                </p>
              </div>
              
              <h3 className='text-2xl font-black text-slate-800 dark:text-white mb-8 group-hover:text-teal-500 transition-colors'>
                {item.name}
              </h3>
              
              <button className='w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-[1.2rem] font-black text-sm hover:bg-teal-600 dark:hover:bg-teal-500 dark:hover:text-white transition-all flex items-center justify-center gap-3 group/btn shadow-xl shadow-slate-200 dark:shadow-none'>
                حجز موعد الآن
                <span className='text-lg group-hover/btn:translate-x-[-4px] transition-transform'>←</span>
              </button>
            </div>
          </motion.div>
        )) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center py-24 opacity-40"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-black text-slate-400">عذراً، لا يوجد أطباء متاحون حالياً</h3>
            <p className="text-sm font-bold mt-2">جرب البحث في تخصص آخر</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Doctors