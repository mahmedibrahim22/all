import React, { useEffect, useState } from 'react'

const PharmaciesList = () => {
  return (
    <div className='m-5' dir="rtl">
      <h1 className='text-xl font-bold text-slate-800 dark:text-white mb-6'>إدارة الصيدليات المتعاقدة</h1>
      
      <div className='bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm'>
        <table className='w-full text-right'>
          <thead className='bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm'>
            <tr>
              <th className='p-5 font-black'>الصيدلية</th>
              <th className='p-5 font-black'>العنوان</th>
              <th className='p-5 font-black'>الهاتف</th>
              <th className='p-5 font-black'>الحالة</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-50 dark:divide-slate-800'>
            {/* مثال لبيانات صيدلية */}
            <tr className='hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors'>
              <td className='p-5 font-bold text-slate-700 dark:text-slate-200'>صيدلية الشفاء</td>
              <td className='p-5 text-sm text-slate-500'>الزقازيق - حي الزهور</td>
              <td className='p-5 text-sm font-mono'>01012345678</td>
              <td className='p-5'>
                <span className='bg-green-100 dark:bg-green-900/30 text-green-600 px-3 py-1 rounded-full text-[10px] font-black'>نشط</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PharmaciesList