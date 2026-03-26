import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Appointment = () => {
    const { docId } = useParams()
    const navigate = useNavigate()
    
    const { doctors } = useSelector(state => state.app || state.doctors || { doctors: [] })
    const { token } = useSelector(state => state.auth || state.user || { token: '' })
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currencySymbol = 'EGP'

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const [patientPhone, setPatientPhone] = useState('')
    const [patientAge, setPatientAge] = useState('')
    const [patientGender, setPatientGender] = useState('ذكر')
    const [illnessDesc, setIllnessDesc] = useState('')
    const [illnessImage, setIllnessImage] = useState(null) 

    const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

    const fetchDocInfo = useCallback(() => {
        if (doctors && doctors.length > 0) {
            const doc = doctors.find(doc => doc._id === docId)
            if (doc) setDocInfo(doc)
        }
    }, [doctors, docId])

    const getAvailableSlots = async () => {
        if (!docInfo) return;
        setDocSlots([])
        let today = new Date()
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()
                const slotDate = day + "_" + month + "_" + year
                const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true
                if (isSlotAvailable) timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('يرجى تسجيل الدخول أولاً')
            return navigate('/login')
        }
        if (!slotTime) return toast.error("من فضلك اختر ساعة الكشف أولاً")
        if (!patientPhone || patientPhone.length < 11) return toast.warn("يرجى إدخال رقم واتساب صحيح")

        try {
            const date = docSlots[slotIndex][0].datetime
            const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

            // استخدام FormData لإرسال الصورة
            const formData = new FormData()
            formData.append('docId', docId)
            formData.append('slotDate', slotDate)
            formData.append('slotTime', slotTime)
            formData.append('patientPhone', patientPhone)
            formData.append('patientAge', patientAge)
            formData.append('patientGender', patientGender)
            formData.append('illnessDescription', illnessDesc)
            if (illnessImage) formData.append('illnessImage', illnessImage)

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', formData, { headers: { token } })

            if (data.success) {
                toast.success("تم إرسال طلب الحجز بنجاح")
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("حدث خطأ أثناء الحجز")
        }
    }

    useEffect(() => { fetchDocInfo() }, [fetchDocInfo])
    useEffect(() => { if (docInfo) getAvailableSlots() }, [docInfo])

    return docInfo ? (
        <div className='py-10 px-4 md:px-10 max-w-6xl mx-auto text-right font-black' dir="rtl">
            {/* معلومات الدكتور */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div className='bg-teal-500 w-full sm:max-w-72 rounded-3xl overflow-hidden shadow-lg'>
                    <img className='w-full' src={docInfo.image} alt="" />
                </div>
                <div className='flex-1 border border-slate-100 p-8 rounded-3xl bg-white shadow-sm'>
                    <p className='text-3xl text-slate-900'>{docInfo.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-teal-600 font-bold'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <span className='py-0.5 px-2 border border-teal-200 text-xs rounded-full'>{docInfo.experience} خبرة</span>
                    </div>
                    <p className='text-slate-500 mt-4 leading-relaxed font-bold'>{docInfo.about}</p>
                    <p className='text-slate-900 mt-4 text-xl font-black underline underline-offset-8 decoration-teal-500'>سعر الكشف: {docInfo.fees} {currencySymbol}</p>
                </div>
            </div>

            {/* بيانات الحجز */}
            <div className='mt-10 bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm'>
                <h3 className='text-xl text-slate-800 mb-8 border-r-4 border-teal-500 pr-3'>بيانات الحجز والحالة المرضية</h3>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-slate-600 text-sm'>رقم واتساب المريض:</label>
                        <input type="number" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} placeholder="01xxxxxxxxx" className='w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-teal-500 transition-all' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-slate-600 text-sm'>عمر المريض:</label>
                        <input type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="مثال: 25" className='w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-teal-500 transition-all' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-slate-600 text-sm'>النوع:</label>
                        <select value={patientGender} onChange={(e) => setPatientGender(e.target.value)} className='w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-teal-500 transition-all bg-white' >
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col gap-2 mb-10'>
                    <label className='text-slate-600 text-sm'>نبذة عن المرض / الشكوى:</label>
                    <textarea rows="3" value={illnessDesc} onChange={(e) => setIllnessDesc(e.target.value)} placeholder="اكتب هنا ما تشعر به لمساعدة الطبيب..." className='w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:border-teal-500 transition-all resize-none' ></textarea>
                </div>

                {/* قسم رفع صورة الروشتة الجديد */}
                <div className='mb-10'>
                    <label className='text-slate-600 text-sm block mb-2'>إرفاق صورة (روشتة أو مكان الألم):</label>
                    <div className='flex items-center gap-4'>
                        <label htmlFor="illness-img" className='cursor-pointer'>
                            <div className='w-24 h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center hover:border-teal-500 transition-all overflow-hidden'>
                                {illnessImage ? 
                                    <img src={URL.createObjectURL(illnessImage)} className='w-full h-full object-cover' /> : 
                                    <img src={assets.upload_area} className='w-8 opacity-30' />
                                }
                            </div>
                        </label>
                        <input type="file" id="illness-img" hidden onChange={(e)=>setIllnessImage(e.target.files[0])} />
                        {illnessImage && <p className='text-xs text-red-500 cursor-pointer' onClick={()=>setIllnessImage(null)}>إزالة الصورة</p>}
                    </div>
                </div>

                {/* اختيار اليوم والساعة */}
                <p className='text-slate-900 mb-6 text-lg'>اختر يوم الكشف:</p>
                <div className='flex gap-3 overflow-x-auto pb-4'>
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div onClick={() => {setSlotIndex(index); setSlotTime('')}} key={index} className={`text-center py-5 min-w-[85px] rounded-2xl cursor-pointer transition-all ${slotIndex === index ? 'bg-teal-600 text-white shadow-lg scale-105' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                            <p className='text-xs font-bold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-xl font-black'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                <div className='flex items-center gap-3 overflow-x-auto mt-8 pb-4'>
                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-bold px-7 py-3 rounded-xl cursor-pointer transition-all flex-shrink-0 ${item.time === slotTime ? 'bg-teal-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button onClick={bookAppointment} className='bg-slate-900 text-white font-black px-16 py-5 rounded-[1.5rem] mt-10 hover:bg-teal-700 transition-all shadow-xl active:scale-95'>
                    تأكيد طلب الحجز
                </button>
            </div>
        </div>
    ) : null
}

export default Appointment