import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
    // جلب البيانات من الـ Context
    const { doctors, getAllDoctors, aToken } = useContext(AdminContext)
    
    // حالة لمتابعة هل انتهى التحميل أم لا (لمنع الـ Spinner اللانهائي)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetchDoctors = async () => {
            // نتحقق من وجود التوكن أولاً قبل طلب البيانات
            const token = aToken || localStorage.getItem('aToken');
            
            if (token) {
                try {
                    await getAllDoctors();
                } catch (error) {
                    console.error("Error fetching doctors:", error);
                } finally {
                    // نوقف التحميل في كل الأحوال (سواء نجح الطلب أو فشل)
                    setIsLoaded(true);
                }
            } else {
                // لو مفيش توكن أصلاً نوقف التحميل عشان ميقعدش يلف عالفاضي
                setIsLoaded(true);
            }
        };

        fetchDoctors();
    }, [aToken, getAllDoctors]);

    return (
        <div className='m-6 min-h-screen' dir="rtl">
            {/* العناوين والإحصائيات */}
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10'>
                <div>
                    <h1 className='text-2xl font-black text-slate-800 dark:text-white'>قائمة الأطباء</h1>
                    <p className='text-slate-500 dark:text-slate-400 text-sm'>إدارة وتعديل بيانات طاقم الأطباء في عَوْن</p>
                </div>
                <div className='px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-2xl'>
                    <span className='text-teal-600 dark:text-teal-400 text-sm font-bold'>
                        إجمالي الأطباء: {doctors?.length || 0}
                    </span>
                </div>
            </div>

            {/* منطق العرض المستجيب */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
                
                {!isLoaded ? (
                    /* حالة التحميل الأنيقة */
                    <div className='col-span-full py-40 flex flex-col items-center justify-center space-y-4'>
                        <div className='w-14 h-14 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin'></div>
                        <p className='text-slate-400 font-bold animate-pulse'>جاري استدعاء البيانات من السيرفر...</p>
                    </div>
                ) : doctors && doctors.length > 0 ? (
                    /* عرض الكروت في حالة وجود بيانات */
                    doctors.map((item, index) => (
                        <div key={index} className='group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'>
                            
                            {/* صورة الطبيب */}
                            <div className='relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800'>
                                <img 
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' 
                                    src={item.image} 
                                    alt={item.name} 
                                />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg ${item.available ? 'bg-green-500' : 'bg-rose-500'}`}>
                                    {item.available ? 'متاح حالياً' : 'غير متاح'}
                                </div>
                            </div>

                            {/* بيانات الطبيب */}
                            <div className='p-6'>
                                <p className='text-teal-600 dark:text-teal-400 text-xs font-black mb-1 uppercase tracking-tighter'>
                                    {item.speciality}
                                </p>
                                
                                <h3 className='text-slate-800 dark:text-white text-lg font-black group-hover:text-teal-600 transition-colors'>
                                    د. {item.name}
                                </h3>

                                <div className='mt-5 pt-4 flex items-center gap-3 border-t border-slate-50 dark:border-slate-800'>
                                    <input 
                                        type="checkbox" 
                                        className='w-5 h-5 accent-teal-500 cursor-pointer rounded-lg'
                                        checked={item.available} 
                                        readOnly 
                                    />
                                    <p className={`text-sm font-bold ${item.available ? 'text-green-600' : 'text-slate-400'}`}>
                                        {item.available ? 'قابل للحجز' : 'محجوب عن المرضى'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    /* حالة عدم وجود بيانات (تظهر بدلاً من الـ Spinner اللانهائي) */
                    <div className='col-span-full py-40 flex flex-col items-center justify-center text-center'>
                        <p className='text-slate-400 text-lg font-bold'>لا يوجد أطباء مسجلين في النظام حالياً.</p>
                        <p className='text-slate-500 text-sm'>تأكد من إضافة أطباء من صفحة "إضافة طبيب" أو تأكد من اتصال السيرفر.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorsList