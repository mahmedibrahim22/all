import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
      if (aToken) {
          setAToken('');
          localStorage.removeItem('aToken');
      }
      if (dToken) {
          setDToken('');
          localStorage.removeItem('dToken');
      }
      navigate('/login');
  }

  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${
      isActive 
      ? 'bg-teal-50 dark:bg-teal-500/10 border-l-4 border-teal-600 text-teal-600 dark:text-teal-400 font-black' 
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-bold'
    }`

  return (
    <div className='min-h-screen bg-white dark:bg-slate-900 border-l dark:border-slate-800 flex flex-col justify-between transition-colors duration-300'>
      
      <div>
          {/* قائمة الأدمن */}
          {aToken && (
            <ul className='mt-5'>
              <NavLink className={navLinkClass} to={'/admin-dashboard'}><img className='w-5' src={assets.home_icon} alt="" /><p className='hidden md:block'>لوحة التحكم</p></NavLink>
              <NavLink className={navLinkClass} to={'/all-appointments'}><img className='w-5' src={assets.appointment_icon} alt="" /><p className='hidden md:block'>المواعيد</p></NavLink>
              <NavLink className={navLinkClass} to={'/add-doctor'}><img className='w-5' src={assets.add_icon} alt="" /><p className='hidden md:block'>إضافة طبيب</p></NavLink>
              <NavLink className={navLinkClass} to={'/doctor-list'}><img className='w-5' src={assets.people_icon} alt="" /><p className='hidden md:block'>قائمة الأطباء</p></NavLink>
            </ul>
          )}

          {/* قائمة الطبيب */}
          {dToken && (
            <ul className='mt-5'>
              <NavLink className={navLinkClass} to={'/doctor-dashboard'}><img className='w-5' src={assets.home_icon} alt="" /><p className='hidden md:block'>لوحة التحكم</p></NavLink>
              <NavLink className={navLinkClass} to={'/doctor-appointments'}><img className='w-5' src={assets.appointment_icon} alt="" /><p className='hidden md:block'>المواعيد</p></NavLink>
              <NavLink className={navLinkClass} to={'/doctor-profile'}><img className='w-5' src={assets.people_icon} alt="" /><p className='hidden md:block'>الملف الشخصي</p></NavLink>
            </ul>
          )}
      </div>

      {/* زر تسجيل الخروج في الأسفل */}
      <div className='mb-10 px-3 md:px-9'>
          <button 
            onClick={logout}
            className='w-full flex items-center gap-3 py-3 px-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 font-black border border-transparent hover:border-red-100 dark:hover:border-red-900/30'
          >
            <img className='w-5 rotate-180' src={assets.upload_icon} alt="" style={{filter: 'invert(30%) sepia(100%) saturate(2000%) hue-rotate(340deg)'}} />
            <p className='hidden md:block'>تسجيل الخروج</p>
          </button>
      </div>
      
    </div>
  )
}

export default Sidebar