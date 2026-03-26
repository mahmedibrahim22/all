import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion' // لإضافة نعومة في الانتقال

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login';
      const { data } = await axios.post(backendUrl + endpoint, { email, password });
      
      if (data.success) {
        const tokenKey = state === 'Admin' ? 'aToken' : 'dToken';
        localStorage.setItem(tokenKey, data.token);
        state === 'Admin' ? setAToken(data.token) : setDToken(data.token);
        toast.success(`تم تسجيل دخول ${state === 'Admin' ? 'الأدمن' : 'الطبيب'} بنجاح`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  return (
    <div className='min-h-[90vh] flex items-center justify-center bg-slate-50 dark:bg-[#0b1120] px-4 transition-colors duration-500' dir="rtl">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] top-20 right-20 -z-10" />
      <div className="absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] bottom-20 left-20 -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md'
      >
        <form 
          onSubmit={onSubmitHandler} 
          className='bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all'
        >
          <div className='text-center mb-10'>
             <h2 className='text-3xl font-black text-slate-800 dark:text-white mb-2'>
              تسجيل دخول <span className='text-teal-500'>{state === 'Admin' ? 'الأدمن' : 'الطبيب'}</span>
            </h2>
            <p className='text-slate-400 dark:text-slate-500 font-bold text-sm'>
              مرحباً بك في منصة عون الطبية
            </p>
          </div>

          <div className='space-y-5'>
            <div>
              <label className='block mb-2 text-sm font-black text-slate-700 dark:text-slate-300 mr-2'>البريد الإلكتروني</label>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                className='w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-teal-500 dark:focus:border-teal-500 outline-none text-slate-900 dark:text-white transition-all font-medium' 
                type="email" 
                placeholder='example@mail.com' 
                required 
              />
            </div>

            <div>
              <label className='block mb-2 text-sm font-black text-slate-700 dark:text-slate-300 mr-2'>كلمة المرور</label>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className='w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-teal-500 dark:focus:border-teal-500 outline-none text-slate-900 dark:text-white transition-all font-medium' 
                type="password" 
                placeholder='••••••••' 
                required 
              />
            </div>
          </div>

          <button 
            type='submit' 
            className='w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl text-lg font-black mt-8 shadow-lg shadow-teal-500/30 transition-all active:scale-[0.98]'
          >
            دخول الحساب
          </button>

          <div className='mt-8 pt-6 border-t dark:border-slate-800 text-center'>
            <p className='text-slate-500 dark:text-slate-400 font-bold text-sm mb-3'>
              {state === 'Admin' ? 'هل أنت طبيب؟' : 'هل أنت أدمن المنصة؟'}
            </p>
            <button 
              type="button"
              onClick={() => {
                setState(state === 'Admin' ? 'Doctor' : 'Admin');
                setEmail('');
                setPassword('');
              }} 
              className='text-teal-600 dark:text-teal-400 font-black hover:underline underline-offset-8 transition-all'
            >
              تسجيل دخول كـ {state === 'Admin' ? 'طبيب' : 'أدمن'} من هنا
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login