import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
    // نتحقق من الريدكس أولاً، ولو مش موجود نشوف الـ LocalStorage مباشرة
    const { token } = useSelector((state) => state.user)
    const storedToken = localStorage.getItem('token')

    // لو مفيش توكن في الاتنين، يروح لصفحة اللوجين
    if (!token && !storedToken) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute