import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const LabsList = () => {
  const { dToken, labsData, getAllLabs } = useContext(AdminContext)

  useEffect(() => {
    if (dToken) {
      getAllLabs()
    }
  }, [dToken])

  return (
    <div className='m-5' dir="rtl">
      <h1 className='text-xl font-black text-slate-800 dark:text-white mb-6'>إدارة معامل التحاليل</h1>

      <div className='bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm'>
        <table className='w-full text-right'>
          <thead className='bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase'>
            <tr>
              <th className='p-5 font-black'>المعمل</th>
              <th className='p-5 font-black'>الهاتف</th>
              <th className='p-5 font-black'>الخدمة المنزلية</th>
              <th className='p-5 font-black'>عدد التحاليل</th>
              <th className='p-5 font-black text-center'>الإجراءات</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-50 dark:divide-slate-800'>
            {labsData.map((item, index) => (
              <tr key={index} className='hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors'>
                <td className='p-5'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center font-bold'>🧪</div>
                    <span className='font-bold text-slate-700 dark:text-slate-200'>{item.name}</span>
                  </div>
                </td>
                <td className='p-5 text-sm font-mono text-slate-500'>{item.phone}</td>
                <td className='p-5'>
                  {item.homeService ? 
                    <span className='bg-green-100 dark:bg-green-900/30 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black'>متاحة ✅</span> : 
                    <span className='bg-slate-100 dark:bg-slate-800 text-slate-400 px-3 py-1 rounded-lg text-[10px] font-black'>غير متاحة</span>
                  }
                </td>
                <td className='p-5 text-sm font-bold text-slate-600 dark:text-slate-400'>
                  {item.tests?.length || 0} تحليل
                </td>
                <td className='p-5 text-center'>
                  <button className='text-blue-600 hover:underline text-xs font-black ml-4'>تعديل</button>
                  <button className='text-red-500 hover:underline text-xs font-black'>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {labsData.length === 0 && (
          <div className='py-20 text-center text-slate-400 font-bold'>
            لا يوجد معامل مسجلة حالياً
          </div>
        )}
      </div>
    </div>
  )
}

export default LabsList