import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='bg-[#F8F9FD] min-h-screen'>
      {/* إضافة limit={1} لمنع تكدس التنبيهات */}
      <ToastContainer position="top-right" autoClose={3000} limit={1} />
      
      {!aToken && !dToken ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <div className='w-full'> 
              <Routes>
                {/* مسارات الطبيب */}
                {dToken && (
                  <>
                    <Route path='/' element={<Navigate to='/doctor-dashboard' />} />
                    <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                    <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                    <Route path='/doctor-profile' element={<DoctorProfile />} />
                  </>
                )}
                {/* مسارات الأدمن */}
                {aToken && (
                  <>
                    <Route path='/' element={<Navigate to='/admin-dashboard' />} />
                    <Route path='/admin-dashboard' element={<DoctorDashboard />} /> 
                  </>
                )}
                {/* أي مسار آخر يرجع للرئيسية */}
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App