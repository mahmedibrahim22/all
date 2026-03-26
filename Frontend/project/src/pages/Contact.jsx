import React from 'react'

const Contact = () => {

  // روابط صور مباشرة ومضمونة لضمان ظهورها فوراً
  const images = {
    contactMain: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    locationIcon: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    phoneIcon: "https://cdn-icons-png.flaticon.com/512/3059/3059590.png"
  }

  return (
    <div className='py-20 px-6 animate-fade-in'>
      
      {/* العنوان الرئيسي - تم تغيير الاسم لـ عَوْن */}
      <div className='text-center mb-20'>
        <p className='text-5xl font-black text-slate-900'>
          تواصل مع <span className='text-teal-600 underline decoration-teal-100 underline-offset-8'>عَوْن</span>
        </p>
        <p className='text-slate-400 mt-4 text-lg font-medium tracking-wide'>نحن هنا لتقديم المدد والرعاية على مدار الساعة</p>
      </div>

      <div className='flex flex-col justify-center md:flex-row gap-16 lg:gap-24 mb-24 items-center max-w-7xl mx-auto'>
        
        {/* قسم الصورة مع تأثيرات بصرية */}
        <div className='relative group w-full md:w-1/2 flex justify-center'>
          <div className='absolute -top-10 -right-10 w-48 h-48 bg-teal-50 rounded-full -z-10 group-hover:scale-125 transition-transform duration-700 opacity-60 blur-2xl'></div>
          <div className='absolute -bottom-10 -left-10 w-32 h-32 bg-slate-100 rounded-full -z-10 animate-pulse opacity-70 blur-xl'></div>
          
          <div className='relative overflow-hidden rounded-[4rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-white group-hover:rotate-1 transition-all duration-700'>
             <img 
              className='w-full max-w-[500px] h-[550px] object-cover group-hover:scale-110 transition-transform duration-1000' 
              src={images.contactMain} 
              alt="Contact Aoun Office" 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          </div>
        </div>

        {/* تفاصيل الاتصال */}
        <div className='flex flex-col justify-center items-start gap-12 md:w-1/2 text-right w-full'>
          
          {/* كارت المقر الرئيسي */}
          <div className='group flex items-start gap-6 w-full p-4 rounded-3xl hover:bg-slate-50 transition-colors'>
            <div className='bg-teal-600 shadow-lg shadow-teal-100 p-4 rounded-2xl group-hover:rotate-12 transition-transform'>
              <img src={images.locationIcon} className='w-8 h-8 invert' alt="Location" />
            </div>
            <div className='space-y-2'>
              <b className='text-2xl text-slate-800 font-black block'>مقر عَوْن الرئيسي</b>
              <p className='text-slate-500 leading-relaxed text-lg'>
                شارع التسعين الشمالي، التجمع الخامس<br />
                <span className='font-black text-teal-700'>القاهرة، جمهورية مصر العربية</span>
              </p>
            </div>
          </div>

          {/* كارت بيانات الاتصال */}
          <div className='group flex items-start gap-6 w-full p-4 rounded-3xl hover:bg-slate-50 transition-colors'>
            <div className='bg-slate-900 shadow-lg shadow-slate-200 p-4 rounded-2xl group-hover:-rotate-12 transition-transform'>
              <img src={images.phoneIcon} className='w-8 h-8 invert' alt="Phone" />
            </div>
            <div className='space-y-3'>
              <b className='text-2xl text-slate-800 font-black block'>قنوات التواصل المباشر</b>
              <div className='space-y-1'>
                <p className='text-slate-500 text-lg flex items-center gap-2 justify-end'>
                   <span className='font-black text-slate-800 tracking-wider text-xl'>+20 123 456 789</span> :موبايل
                </p>
                <p className='text-slate-500 text-lg flex items-center gap-2 font-medium justify-end'>
                   <span className='text-teal-600 font-black border-b border-teal-100'>support@aoun-egypt.com</span> :إيميل
                </p>
              </div>
            </div>
          </div>

          {/* كارت الوظائف المطور */}
          <div className='bg-slate-950 p-12 rounded-[3.5rem] text-white w-full shadow-2xl relative overflow-hidden group border border-slate-800'>
            <div className='absolute -top-20 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] group-hover:bg-teal-500/20 transition-all duration-700'></div>
            
            <div className='relative z-10'>
              <span className='bg-teal-500/20 text-teal-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block'>انضم إلينا</span>
              <b className='text-3xl block mb-4 font-black text-white'>كن جزءاً من فريق عَوْن</b>
              <p className='text-slate-400 mb-10 leading-relaxed text-lg font-medium opacity-90 text-right'>
                هل أنت طبيب أو مبرمج تطمح للتغيير؟ ساهم معنا في عَوْن لإعادة تعريف جودة الحياة الصحية في مصر.
              </p>
              <button className='bg-white text-slate-950 px-12 py-5 rounded-2xl font-black text-lg hover:bg-teal-500 hover:text-white transition-all duration-500 shadow-xl active:scale-95 w-full md:w-auto'>
                استكشف فرص العمل
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact