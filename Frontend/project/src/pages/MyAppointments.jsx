import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const MyAppointments = () => {
    const { token } = useSelector(state => state.user || { token: '' })
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [appointments, setAppointments] = useState([])

    const months = [" ", "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    
    const slotDateFormat = (slotDate) => {
        const [day, month, year] = slotDate.split('_')
        return `${day} ${months[Number(month)]} ${year}`
    }

    const getUserAppointments = useCallback(async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            toast.error("فشل في تحديث قائمة المواعيد")
        }
    }, [backendUrl, token])

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء الإلغاء")
        }
    }

    useEffect(() => {
        if (token) { getUserAppointments() }
    }, [token, getUserAppointments])

    return (
        <div className='py-20 px-4 md:px-10 max-w-5xl mx-auto' dir="rtl">
            <h2 className='text-3xl font-black text-slate-900 mb-10'>مواعيدي المحجوزة</h2>
            <div className='grid gap-6'>
                <AnimatePresence>
                    {appointments.map((item) => (
                        <motion.div 
                            key={item._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-white border ${item.cancelled ? 'border-red-100 bg-red-50/30' : 'border-slate-100'} p-6 rounded-[2.5rem] flex flex-col md:flex-row gap-6 shadow-sm`}
                        >
                            <img className='w-32 h-32 object-cover rounded-2xl bg-teal-500' src={item.docData.image} alt="" />
                            <div className='flex-1 text-right'>
                                <p className='text-2xl font-black text-slate-800'>{item.docData.name}</p>
                                <p className='text-teal-600 font-bold text-sm mb-3'>{item.docData.speciality}</p>
                                <div className='space-y-1 text-sm font-bold text-slate-500'>
                                    <p>📅 {slotDateFormat(item.slotDate)} | 🕒 {item.slotTime}</p>
                                    <p className='text-teal-800 mt-2'>📱 رقم التواصل: {item.patientPhone || 'غير متوفر'}</p>
                                </div>
                                <div className='mt-5'>
                                    {item.cancelled ? (
                                        <span className='text-red-500 font-black'>❌ تم إلغاء الحجز</span>
                                    ) : item.isCompleted ? (
                                        <span className='text-green-600 font-black px-4 py-2 bg-green-50 rounded-xl border border-green-100'>تم الكشف بنجاح ✅</span>
                                    ) : item.payment ? (
                                        <span className='text-teal-600 font-black'>✅ موعد مؤكد</span>
                                    ) : (
                                        <span className='text-orange-600 font-black animate-pulse'>⏳ بانتظار مراجعة الطبيب</span>
                                    )}
                                </div>
                            </div>
                            <div className='flex items-center'>
                                {!item.cancelled && !item.isCompleted && (
                                    <button onClick={() => cancelAppointment(item._id)} className='text-red-500 border border-red-200 px-6 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all'>إلغاء الموعد</button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default MyAppointments