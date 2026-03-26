import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setDoctors } from '../store/slices/DoctorSlice'; 

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const dispatch = useDispatch();
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = import.meta.env.VITE_CURRENCY || 'EGP'

    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(false)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                // ✅ دي اللي هتملا الـ Array اللي كان طالع 0 في الـ Console
                dispatch(setDoctors(data.doctors)) 
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("فشل في جلب بيانات الأطباء")
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        }
    }, [token])

    const value = {
        getDoctorsData,
        backendUrl, token, setToken,
        userData, setUserData, currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider