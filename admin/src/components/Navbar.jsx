import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300' dir="rtl">
            <div className='flex items-center gap-3'>
                <p 
                    onClick={() => navigate('/')} 
                    className='text-3xl font-black text-teal-600 cursor-pointer drop-shadow-sm'
                >
                    عَوْن
                </p>
                <span className='border px-3 py-1 rounded-full border-teal-100 dark:border-teal-900/50 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-wider'>
                    {aToken ? 'لوحة التحكم - أدمن' : 'لوحة التحكم - طبيب'}
                </span>
            </div>
            
            <div className='flex items-center gap-4'>
                {/* هنا ممكن تضيف زرار تبديل الثيم مستقبلاً */}
                <div className='hidden sm:block text-right'>
                    <p className='text-xs text-slate-400 font-bold'>مرحباً بك مجدداً</p>
                    <p className='text-sm text-slate-700 dark:text-slate-200 font-black'>إدارة المنصة</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar