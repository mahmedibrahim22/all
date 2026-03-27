import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DeliveryList = () => {
  const { dToken, deliveryData, getAllDelivery, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (dToken) {
      getAllDelivery()
    }
  }, [dToken])

  return (
    <div className='m-5' dir="rtl">
      <h1 className='text-xl font-black text-slate-800 dark:text-white mb-6'>إدارة مناديب التوصيل</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {deliveryData.map((item, index) => (
          <div key={index} className='bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2.5rem] hover:shadow-md transition-all group'>
            <div className='flex justify-between items-start mb-4'>
              <div className='w-14 h-14 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform'>
                🚴‍♂️
              </div>
              <div className='flex flex-col items-end'>
                <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.isAvailable} className='cursor-pointer accent-teal-600' />
                <p className='text-[10px] mt-1 font-bold text-slate-400'>{item.isAvailable ? 'متاح' : 'غير متاح'}</p>
              </div>
            </div>

            <h3 className='text-lg font-black text-slate-800 dark:text-white'>{item.name}</h3>
            <p className='text-sm text-slate-500 font-medium mb-4'>{item.phone}</p>
            
            <div className='flex items-center gap-2 text-[11px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/30 w-fit px-3 py-1 rounded-full'>
              <span className='w-1.5 h-1.5 bg-teal-600 rounded-full animate-pulse'></span>
              نشط حالياً
            </div>

            <button className='w-full mt-6 py-3 bg-slate-50 dark:bg-slate-800 text-red-500 rounded-2xl font-black text-xs hover:bg-red-50 dark:hover:bg-red-900/20 transition-all'>
              تجميد الحساب
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryList