import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])

    return (
        <div className='w-full max-w-6xl m-5 font-black' dir="rtl">
            <p className='mb-3 text-lg text-slate-900'>جميع المواعيد المحجوزة</p>
            
            <div className='bg-white border rounded-2xl text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll shadow-sm'>
                {/* رأس الجدول */}
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 py-4 px-6 border-b bg-slate-50 text-slate-700'>
                    <p>#</p>
                    <p>المريض</p>
                    <p>التواصل</p>
                    <p>التاريخ والوقت</p>
                    <p>الطبيب</p>
                    <p>الحالة</p>
                    <p className='text-center'>إجراء</p>
                </div>

                {appointments && appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div key={index} className='flex flex-wrap justify-between sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 items-center text-slate-500 py-4 px-6 border-b hover:bg-slate-50'>
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 h-8 rounded-full bg-slate-100 object-cover' src={item.userData?.image} alt="" />
                                <p className='text-slate-900 font-bold'>{item.userData?.name}</p>
                            </div>
                            <p className='text-teal-700'>{item.userData?.phone || '01xxxx'}</p>
                            <p>{item.slotDate} | {item.slotTime}</p>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 h-8 rounded-full bg-teal-500 object-cover' src={item.docData?.image} alt="" />
                                <p className='text-slate-900'>{item.docData?.name}</p>
                            </div>
                            <p>
                                {item.cancelled ? <span className='text-red-500 font-bold'>ملغي</span> : 
                                 item.isCompleted ? <span className='text-green-500 font-bold'>مكتمل</span> : 
                                 <span className='text-orange-500 font-bold'>قيد الانتظار</span>}
                            </p>
                            <div className='flex justify-center'>
                                {!item.cancelled && !item.isCompleted ? (
                                    <img 
                                        onClick={() => cancelAppointment(item._id)} 
                                        className='w-10 cursor-pointer p-2 hover:bg-red-100 rounded-full transition-all' 
                                        src={assets.cancel_icon} 
                                        title="إلغاء الموعد"
                                        alt="Cancel" 
                                    />
                                ) : (
                                    <span className='text-gray-300'>--</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-24 text-slate-400'>
                        <p className='text-xl'>لا توجد مواعيد حالياً.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllAppointments