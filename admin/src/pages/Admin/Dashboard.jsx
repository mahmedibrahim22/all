import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext)

  // جلب بيانات الإحصائيات أول ما الصفحة تفتح
  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  // لو البيانات لسه بتحمل، اظهر رسالة تحميل بسيطة
  if (!dashData) {
    return <div className='m-5 font-bold text-slate-500'>جاري تحميل الإحصائيات...</div>
  }

  return (
    <div className='m-5' dir="rtl">
      
      {/* 1. قسم كروت الإحصائيات (Dynamic Stats) */}
      <div className='flex flex-wrap gap-3'>
        
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>الأطباء</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>المواعيد</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>المرضى</p>
          </div>
        </div>

      </div>

      {/* 2. قسم آخر الحجوزات (Latest Bookings) */}
      <div className='bg-white mt-10 rounded border'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border-b'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>آخر الحجوزات</p>
        </div>

        <div className='pt-4 px-6 pb-4'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{item.slotDate}</p>
                </div>
                {
                  item.cancelled 
                  ? <p className='text-red-400 text-xs font-medium'>ملغي</p>
                  : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                }
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard