import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  if (!dashData) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='m-6' dir="rtl">
      {/* كروت الإحصائيات */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        
        <div className='flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group'>
          <div className='p-4 bg-teal-50 dark:bg-teal-500/10 rounded-2xl group-hover:bg-teal-500 transition-colors'>
            <img className='w-8 dark:invert group-hover:invert-0' src={assets.doctor_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-black text-slate-800 dark:text-white'>{dashData.doctors}</p>
            <p className='text-slate-500 dark:text-slate-400 font-bold text-sm'>الأطباء</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group'>
          <div className='p-4 bg-orange-50 dark:bg-orange-500/10 rounded-2xl group-hover:bg-orange-500 transition-colors'>
            <img className='w-8 dark:invert group-hover:invert-0' src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-black text-slate-800 dark:text-white'>{dashData.appointments}</p>
            <p className='text-slate-500 dark:text-slate-400 font-bold text-sm'>المواعيد</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group'>
          <div className='p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl group-hover:bg-blue-500 transition-colors'>
            <img className='w-8 dark:invert group-hover:invert-0' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-black text-slate-800 dark:text-white'>{dashData.patients}</p>
            <p className='text-slate-500 dark:text-slate-400 font-bold text-sm'>المرضى</p>
          </div>
        </div>

      </div>

      {/* جدول آخر الحجوزات */}
      <div className='bg-white dark:bg-slate-900 mt-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm'>
        <div className='flex items-center gap-3 px-8 py-6 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50'>
          <img className='w-6 dark:invert' src={assets.list_icon} alt="" />
          <p className='font-black text-slate-800 dark:text-white'>أحدث الحجوزات المضافة</p>
        </div>

        <div className='divide-y divide-slate-50 dark:divide-slate-800'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-8 py-5 gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors' key={index}>
              <img className='rounded-2xl w-14 h-14 object-cover border-2 border-slate-100 dark:border-slate-700' src={item.docData.image} alt="" />
              <div className='flex-1'>
                <p className='text-slate-800 dark:text-white font-black'>د. {item.docData.name}</p>
                <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>{item.slotDate}</p>
              </div>
              {item.cancelled 
                ? <span className='px-4 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full text-xs font-black'>ملغي</span>
                : <button onClick={() => cancelAppointment(item._id)} className='p-2 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors group'>
                    <img className='w-6 opacity-50 group-hover:opacity-100' src={assets.cancel_icon} alt="إلغاء" />
                  </button>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard