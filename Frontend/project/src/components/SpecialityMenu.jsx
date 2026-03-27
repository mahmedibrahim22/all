import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SpecialityMenu = () => {
  const navigate = useNavigate()

  // 🆕 تم إضافة تخصصات جديدة بأيقونات طبية خطية (Linear) بسيطة واحترافية
  const specialityData = [
    { speciality: 'طبيب عام', image: 'https://cdn-icons-png.flaticon.com/512/3788/3788710.png' },
    { speciality: 'نساء وتوليد', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041539.png' },
    { speciality: 'جلدية', image: 'https://cdn-icons-png.flaticon.com/512/10123/10123049.png' },
    { speciality: 'أطفال', image: 'https://cdn-icons-png.flaticon.com/512/10291/10291410.png' },
    { speciality: 'أعصاب', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041289.png' },
    { speciality: 'جهاز هضمي', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041432.png' },
    { speciality: 'أمراض القلب', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041267.png' }, // 🆕 قلب خطية
    { speciality: 'أنف وأذن', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041303.png' }, // 🆕 أنف خطية
    { speciality: 'عيون', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041328.png' }, // 🆕 عيون خطية
    { speciality: 'مسالك بولية', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041517.png' }, // 🆕 مسالك خطية
    { speciality: 'عظام', image: 'https://cdn-icons-png.flaticon.com/512/10041/10041467.png' }, // 🆕 عظام خطية
  ]

  return (
    <div id='speciality' className='flex flex-col items-center gap-16 py-24 bg-white dark:bg-[#0b1120] relative overflow-hidden' dir="rtl">
      
      {/* خلفية هادئة جداً */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,_#fcfdfa_0%,_transparent_75%)] dark:bg-[radial-gradient(circle_at_center,_#134e4a10_0%,_transparent_75%)] -z-10'></div>

      {/* العنوان بتنسيق هادي وأنيق */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-center space-y-5 px-4'
      >
        <h2 className='text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-widest'>
          التخصصات <span className="text-teal-600 dark:text-teal-400">الطبية</span> المتاحة
        </h2>
        <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full opacity-30"></div>
        <p className='max-w-xl mx-auto text-base md:text-lg font-bold text-slate-500 dark:text-slate-400 leading-relaxed'>
          اختر التخصص الذي تبحث عنه، واترك مهمة العثور على أفضل استشاري متاح علينا.
        </p>
      </motion.div>

      {/* حاوية الأيقونات بتنسيق الـ Grid المتوازن لـ 11 عنصر */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 md:gap-14 pt-5 w-full px-6 max-w-7xl pb-10'
      >
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, type: "tween" }}
            className='flex flex-col items-center gap-6 cursor-pointer group'
            onClick={() => { navigate(`/doctors/${item.speciality}`); window.scrollTo(0, 0) }}
          >
            {/* تصميم الأيقونة: Soft & Minimized */}
            <div className='w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 group-hover:bg-teal-600 group-hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)] group-hover:border-teal-700 transition-all duration-500 relative'>
              
              <div className='absolute inset-0 bg-teal-50 dark:bg-teal-900/20 rounded-3xl group-hover:opacity-0 transition-opacity'></div>
              
              <img 
                className='w-12 md:w-16 transition-all duration-500 group-hover:invert group-hover:scale-110 z-10' 
                src={item.image} 
                alt={item.speciality} 
              />
            </div>
            
            {/* اسم التخصص بلمسة "عون" */}
            <p className='text-xs md:text-sm font-black text-slate-600 dark:text-slate-300 group-hover:text-teal-700 dark:group-hover:text-teal-500 transition-colors uppercase tracking-wider'>
              {item.speciality}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* زر عرض الكل بتصميم Ghost Modern */}
      <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // التأكد من التوجيه لصفحة الأطباء العامة
                onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
                className='mt-10 relative group overflow-hidden bg-white dark:bg-slate-900 text-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-800 px-12 py-4 rounded-2xl font-black text-sm tracking-widest transition-all duration-300 shadow-sm hover:border-teal-500 hover:shadow-teal-500/10'
            >
                <span className='relative z-10'>استكشف جميع الأطباء</span>
                <div className='absolute inset-0 bg-teal-50 dark:bg-teal-900/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300'></div>
            </motion.button>
    </div>
  )
}

export default SpecialityMenu