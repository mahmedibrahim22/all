import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
      <h1 className='text-8xl font-bold text-teal-600'>404</h1>
      <p className='text-2xl font-semibold text-gray-800 mt-4'>عذراً، الصفحة غير موجودة!</p>
      <p className='text-gray-500 mt-2 max-w-md'>
        يبدو أنك دخلت رابطاً خاطئاً، تأكد من الرابط أو عد للشاشة الرئيسية.
      </p>
      <button 
        onClick={() => navigate('/')}
        className='mt-8 bg-teal-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg'
      >
        العودة للرئيسية
      </button>
    </div>
  )
}

export default NotFound