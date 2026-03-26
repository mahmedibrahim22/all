import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

    const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])

    return (
        <div className='w-full max-w-6xl m-5 '>

            <p className='mb-3 text-lg font-medium text-gray-700'>جميع المواعيد المحجوزة (كطبيب)</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll shadow-sm'>
                
                {/* Table Header */}
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50 font-semibold text-gray-600'>
                    <p>#</p>
                    <p>المريض</p>
                    <p>الدفع</p>
                    <p>العمر</p>
                    <p>التاريخ والوقت</p>
                    <p>الرسوم</p>
                    <p>الإجراءات</p>
                </div>

                {/* Appointments List */}
                {appointments.map((item, index) => (
                    <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-indigo-50 transition-all' key={index}>
                        
                        <p className='max-sm:hidden'>{index + 1}</p>
                        
                        <div className='flex items-center gap-2'>
                            <img src={item.userData.image} className='w-8 h-8 rounded-full border object-cover' alt="" /> 
                            <p className='text-gray-800'>{item.userData.name}</p>
                        </div>

                        <div>
                            <p className={`text-[10px] inline border px-2 py-0.5 rounded-full ${item.payment ? 'border-green-500 text-green-500' : 'border-primary text-primary'}`}>
                                {item.payment ? 'Online' : 'CASH'}
                            </p>
                        </div>

                        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                        
                        <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                        
                        <p className='font-medium text-gray-700'>{currency}{item.amount}</p>

                        <div className='flex items-center justify-center gap-2'>
                            {item.cancelled 
                                ? <p className='text-red-400 text-xs font-medium bg-red-50 px-2 py-1 rounded'>Cancelled</p>
                                : item.isCompleted 
                                    ? <p className='text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded'>Completed</p>
                                    : <div className='flex items-center gap-3'>
                                        <img 
                                            onClick={() => cancelAppointment(item._id)} 
                                            className='w-8 cursor-pointer hover:scale-110 transition-all' 
                                            src={assets.cancel_icon} 
                                            title="إلغاء الموعد"
                                            alt="Cancel" 
                                        />
                                        <img 
                                            onClick={() => completeAppointment(item._id)} 
                                            className='w-8 cursor-pointer hover:scale-110 transition-all' 
                                            src={assets.tick_icon} 
                                            title="إتمام الكشف"
                                            alt="Complete" 
                                        />
                                    </div>
                            }
                        </div>
                    </div>
                ))}

                {/* حالة عدم وجود مواعيد */}
                {appointments.length === 0 && (
                    <div className='p-10 text-center text-gray-400'>
                        لا توجد مواعيد مخصصة لك حالياً.
                    </div>
                )}
            </div>

        </div>
    )
}

export default DoctorAppointments