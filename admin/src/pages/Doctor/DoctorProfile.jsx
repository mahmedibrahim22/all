import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }
            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { 
                headers: { dtoken: dToken } 
            })
            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='m-5 text-right' dir="rtl">
            <div className='flex flex-col gap-4'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg shadow-md' src={profileData.image} alt="" />
                </div>
                <div className='flex-1 border border-stone-100 rounded-2xl p-8 py-7 bg-white shadow-sm'>
                    <p className='text-3xl font-bold text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full bg-gray-50'>{profileData.experience} خبرة</button>
                    </div>
                    
                    <div className='mt-4'>
                        <p className='text-sm font-bold text-[#262626]'>نبذة عن الطبيب:</p>
                        <div className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {isEdit
                                ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} className='w-full border rounded-xl p-3 focus:border-primary outline-none transition-all' rows={6} value={profileData.about} />
                                : <p className='leading-relaxed'>{profileData.about}</p>
                            }
                        </div>
                    </div>

                    <p className='text-gray-600 font-bold mt-4'>
                        سعر الكشف: <span className='text-primary font-black'>{currency} {
                            isEdit 
                            ? <input className='border rounded px-2 w-24 outline-none' type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> 
                            : profileData.fees
                        }</span>
                    </p>

                    <div className='flex gap-2 py-2 mt-2'>
                        <p className='text-gray-700 font-bold'>العنوان:</p>
                        <div className='text-sm text-gray-600'>
                            {isEdit 
                                ? <div className='flex flex-col gap-2'>
                                    <input className='border rounded-lg px-2 py-1 text-xs outline-none' type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} />
                                    <input className='border rounded-lg px-2 py-1 text-xs outline-none' type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                                  </div>
                                : <>
                                    <p>{profileData.address.line1}</p>
                                    <p>{profileData.address.line2}</p>
                                  </>
                            }
                        </div>
                    </div>

                    <div className='flex items-center gap-2 pt-2'>
                        <input className='w-4 h-4 cursor-pointer accent-primary' type="checkbox" id="available" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label className='cursor-pointer text-gray-600 font-medium' htmlFor="available">متاح للحجز الآن</label>
                    </div>

                    <div className='mt-6'>
                        {isEdit
                            ? <button onClick={updateProfile} className='px-10 py-2 border border-primary text-sm rounded-full bg-primary text-white hover:bg-teal-700 transition-all'>حفظ التعديلات</button>
                            : <button onClick={() => setIsEdit(true)} className='px-10 py-2 border border-primary text-sm rounded-full text-primary hover:bg-primary hover:text-white transition-all'>تعديل البيانات</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile