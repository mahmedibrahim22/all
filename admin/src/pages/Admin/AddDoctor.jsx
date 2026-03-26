import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    // ✅ تم تصحيح اسم التوكن ليكون aToken (T كبيرة) ليتطابق مع الـ Backend والميدل وير
    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error('برجاء اختيار صورة الطبيب');
            }

            const formData = new FormData();

            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            // ✅ إرسال التوكن في الـ Headers بالاسم الصحيح aToken
            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: { aToken } 
            })

            if (data.success) {
                toast.success(data.message)
                // تفريغ الحقول بعد الإضافة بنجاح
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            // تحسين عرض الخطأ لو التوكن فيه مشكلة
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء الإضافة");
            console.error("Add Doctor Error:", error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full' dir="rtl">

            <p className='mb-3 text-lg font-medium text-gray-700'>إضافة طبيب جديد</p>

            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-sm'>
                
                {/* رفع الصورة */}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-20 h-20 bg-gray-100 rounded-full cursor-pointer object-cover border' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>تحميل صورة <br /> الطبيب</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    {/* العمود الأيمن (بما أننا نستخدم RTL) */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>اسم الطبيب</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2 focus:border-teal-500 outline-none' type="text" placeholder='الاسم' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>البريد الإلكتروني</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2 focus:border-teal-500 outline-none' type="email" placeholder='الإيميل' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>كلمة المرور</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2 focus:border-teal-500 outline-none' type="password" placeholder='كلمة المرور' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>الخبرة</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-2 outline-none' >
                                <option value="1 Year">سنة واحدة</option>
                                <option value="2 Year">سنتين</option>
                                <option value="3 Year">3 سنوات</option>
                                <option value="5 Year">5 سنوات</option>
                                <option value="10 Year">10+ سنوات</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>سعر الكشف (Fees)</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2 focus:border-teal-500 outline-none' type="number" placeholder='سعر الكشف' required />
                        </div>
                    </div>

                    {/* العمود الأيسر */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>التخصص</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-2 outline-none'>
                                <option value="General physician">طبيب عام</option>
                                <option value="Gynecologist">أمراض نساء</option>
                                <option value="Dermatologist">جلدية</option>
                                <option value="Pediatricians">أطفال</option>
                                <option value="Neurologist">مخ وأعصاب</option>
                                <option value="Gastroenterologist">باطنة وجهاز هضمي</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>الدرجة العلمية (Degree)</p>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 focus:border-teal-500 outline-none' type="text" placeholder='الشهادة' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>العنوان</p>
                            <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2 mb-2 focus:border-teal-500 outline-none' type="text" placeholder='عنوان 1' required />
                            <input onChange={e => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2 focus:border-teal-500 outline-none' type="text" placeholder='عنوان 2' required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>عن الطبيب (About)</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded focus:border-teal-500 outline-none' rows={5} placeholder='اكتب نبذة عن الطبيب'></textarea>
                </div>

                <button type='submit' className='bg-teal-600 px-10 py-3 mt-4 text-white rounded-full hover:bg-teal-700 transition-all'>حفظ وإضافة الطبيب</button>

            </div>
        </form>
    )
}

export default AddDoctor