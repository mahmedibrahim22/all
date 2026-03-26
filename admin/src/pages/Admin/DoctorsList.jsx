import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  // بنادي على الداتا والدالة من الـ AdminContext اللي موجود في مجلد context
  const { doctors, getAllDoctors, aToken } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll' dir="rtl">
      <h1 className='text-lg font-black text-slate-800'>جميع الأطباء</h1>

      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {/* الحماية بـ && بتمنع ظهور الصفحة البيضاء لو الداتا لسه مجاتش */}
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white hover:shadow-md transition-all'>
              <img className='bg-indigo-50 group-hover:bg-teal-600 transition-all duration-500 w-full h-48 object-cover' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-bold'>{item.name}</p>
                <p className='text-zinc-600 text-sm font-medium'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input type="checkbox" checked={item.available} readOnly />
                  <p className={item.available ? 'text-green-600' : 'text-gray-400'}>
                    {item.available ? 'متاح حالياً' : 'غير متاح'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='w-full text-center py-20 text-slate-400 font-bold'>
            جاري تحميل قائمة الأطباء... تأكد من وجود أطباء في قاعدة البيانات.
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorsList