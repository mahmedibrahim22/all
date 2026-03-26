import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
    const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => { if (dToken) getDashData() }, [dToken])

    const openWhatsApp = (phone) => {
        window.open(`https://wa.me/${phone}`, '_blank')
    }

    if (!dashData) return (
        <div className='flex justify-center items-center min-h-[60vh]'>
            <div className='animate-spin h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full shadow-lg'></div>
        </div>
    )

    return (
        <div className='p-4 sm:p-8 bg-slate-50 dark:bg-[#0b1120] min-h-screen transition-colors duration-300' dir="rtl">
            
            {/* إحصائيات سريعة */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[
                    { label: 'إجمالي الأرباح', val: `${dashData.earnings} ${currency}`, icon: assets.earning_icon, color: 'teal' },
                    { label: 'إجمالي الحجوزات', val: dashData.appointments, icon: assets.appointments_icon, color: 'indigo' },
                    { label: 'عدد المرضى', val: dashData.patients, icon: assets.patients_icon, color: 'emerald' }
                ].map((stat, i) => (
                    <div key={i} className='bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all'>
                        <div className='flex items-center gap-5'>
                            <div className={`p-4 bg-${stat.color}-50 dark:bg-${stat.color}-500/10 rounded-2xl`}>
                                <img className='w-10' src={stat.icon} alt="" />
                            </div>
                            <div>
                                <p className='text-2xl font-black text-slate-900 dark:text-white'>{stat.val}</p>
                                <p className='text-slate-400 dark:text-slate-500 font-bold text-sm'>{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* الحجوزات الأخيرة */}
            <div className='bg-white dark:bg-slate-900 mt-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden'>
                <div className='px-8 py-6 border-b dark:border-slate-800 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-6 dark:invert' src={assets.list_icon} alt="" />
                        <p className='font-black text-slate-800 dark:text-slate-100 text-xl'>أحدث الحجوزات</p>
                    </div>
                    <button onClick={() => getDashData()} className='text-sm text-teal-600 font-bold hover:underline underline-offset-4'>تحديث البيانات</button>
                </div>

                <div className='divide-y dark:divide-slate-800'>
                    {dashData.latestAppointments?.map((item, index) => (
                        <div className='p-6 flex flex-col lg:flex-row lg:items-center gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all' key={index}>
                            <img className='rounded-2xl w-16 h-16 object-cover ring-4 ring-slate-50 dark:ring-slate-800' src={item.userData.image} alt="" />
                            
                            <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <p className='text-lg font-black text-slate-900 dark:text-white'>{item.userData.name}</p>
                                    <p className='text-teal-600 dark:text-teal-400 font-bold text-sm mt-1'>📅 {slotDateFormat(item.slotDate)} | 🕒 {item.slotTime}</p>
                                    <button 
                                        onClick={() => openWhatsApp(item.patientPhone)}
                                        className='text-indigo-500 dark:text-indigo-400 mt-2 font-bold text-xs flex items-center gap-1 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 w-fit p-1 px-2 rounded-lg'
                                    >
                                        📱 تواصل واتساب: {item.patientPhone}
                                    </button>
                                </div>
                                <div className='bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50'>
                                    <p className='text-[10px] text-slate-400 font-black uppercase mb-2'>ملخص الحالة</p>
                                    <p className='text-sm text-slate-800 dark:text-slate-200 font-bold'>👤 العمر: {item.patientAge} | {item.patientGender}</p>
                                    <p className='text-xs text-slate-500 dark:text-slate-400 mt-2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm border dark:border-slate-700'>📝 {item.illnessDescription}</p>
                                </div>
                            </div>

                            <div className='flex lg:flex-col items-center gap-3'>
                                {item.cancelled ? (
                                    <span className='px-6 py-2 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full text-xs font-black border border-red-100 dark:border-red-900/30'>ملغي</span>
                                ) : item.isCompleted ? (
                                    <span className='px-6 py-2 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-full text-xs font-black border border-green-100 dark:border-green-900/30'>مكتمل ✅</span>
                                ) : (
                                    <div className='flex gap-2'>
                                        <button onClick={() => cancelAppointment(item._id)} className='p-3 bg-red-50 dark:bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all shadow-sm group'>
                                            <img className='w-5 group-hover:invert transition-all' src={assets.cancel_icon} alt="إلغاء" />
                                        </button>
                                        <button onClick={() => completeAppointment(item._id)} className='p-3 bg-teal-50 dark:bg-teal-500/10 hover:bg-teal-600 text-teal-600 hover:text-white rounded-xl transition-all shadow-sm group'>
                                            <img className='w-5 group-hover:invert transition-all' src={assets.tick_icon} alt="إتمام" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard