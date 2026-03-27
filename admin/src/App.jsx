import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'

// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

// Pages
import Login from './pages/Login'

// Admin Pages
import Dashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import AllAppointments from './pages/Admin/AllAppointments'
import PharmaciesList from './pages/Admin/PharmaciesList'
import DeliveryList from './pages/Admin/DeliveryList'
import LabsList from './pages/Admin/LabsList'

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer position="top-right" autoClose={3000} limit={1} />
      
      {!aToken && !dToken ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <div className='w-full m-5'> 
              <Routes>
                {/* 🛡️ مسارات الأدمن - تم الربط مع Dashboard الصحيحة */}
                {aToken && (
                  <>
                    <Route path='/' element={<Navigate to='/admin-dashboard' />} />
                    <Route path='/admin-dashboard' element={<Dashboard />} /> 
                    <Route path='/add-doctor' element={<AddDoctor />} />
                    <Route path='/doctors-list' element={<DoctorsList />} />
                    <Route path='/all-appointments' element={<AllAppointments />} />
                    <Route path='/pharmacies-list' element={<PharmaciesList />} />
                    <Route path='/delivery-list' element={<DeliveryList />} />
                    <Route path='/labs-list' element={<LabsList />} />
                  </>
                )}

                {/* 🩺 مسارات الطبيب */}
                {dToken && (
                  <>
                    <Route path='/' element={<Navigate to='/doctor-dashboard' />} />
                    <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                    <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                    <Route path='/doctor-profile' element={<DoctorProfile />} />
                  </>
                )}

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