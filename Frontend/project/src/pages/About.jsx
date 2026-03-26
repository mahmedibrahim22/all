import React from 'react'
import { assets } from '../assets/assets.js' 

const About = () => {
  return (
    <div className='py-16 animate-fade-in'>
      
      {/* العنوان الرئيسي بتنسيق عصري */}
      <div className='text-center mb-20'>
        <h2 className='text-4xl md:text-5xl font-black text-slate-800'>
          عن منصة <span className='text-teal-600 underline decoration-teal-100 decoration-8 underline-offset-8'>عَوْن</span>
        </h2>
        <p className='text-gray-400 mt-6 text-lg tracking-wide'>نحن نعيد تعريف مفهوم الرعاية الصحية الرقمية بلمسة مصرية أصيلة</p>
      </div>

      <div className='flex flex-col md:flex-row gap-20 items-center max-w-6xl mx-auto'>
        
        {/* قسم الصورة مع إطارات ديكور */}
        <div className='relative group'>
          <div className='absolute -bottom-6 -left-6 w-40 h-40 bg-slate-100 rounded-[3rem] -z-10 transition-transform group-hover:rotate-12 duration-500'></div>
          <div className='absolute -top-6 -right-6 w-32 h-32 bg-teal-50 rounded-full -z-10 animate-pulse'></div>
          <img 
            className='w-full md:max-w-[450px] rounded-[3.5rem] shadow-2xl border-4 border-white object-cover' 
            src={assets.about_image} 
            alt="About Aoun Egypt" 
          />
        </div>
        
        {/* النص التعريفي */}
        <div className='flex flex-col justify-center gap-8 md:w-1/2'>
          <div className='space-y-6 text-slate-600 leading-relaxed text-xl text-right'>
            <p className='font-black text-slate-800 text-3xl'>رؤيتنا هي أن نكون "العَوْن" الحقيقي لكل مريض.</p>
            <p>
              منصة <b className='text-teal-600'>عَوْن</b> هي المبادرة الرائدة في مصر لتنظيم المواعيد الطبية، صُممت خصيصاً لتناسب احتياجات البيت المصري وتسهل وصولك لأكفأ الاستشاريين في كافة التخصصات.
            </p>
            <p>
              نحن نؤمن أن التكنولوجيا يجب أن تخدم الصحة وتوفر الطمأنينة، لذلك قمنا ببناء نظام ذكي يقلل فترات الانتظار ويوفر لك كافة تفاصيل الطبيب بكل شفافية قبل الحجز.
            </p>
          </div>
          
          {/* عدادات الإحصائيات */}
          <div className='grid grid-cols-2 gap-6 mt-4'>
            <div className='p-6 bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl text-white shadow-lg shadow-teal-100 transform hover:scale-105 transition-all text-center'>
              <h4 className='font-black text-3xl'>+100</h4>
              <p className='text-sm text-teal-100 font-bold'>طبيب استشاري معتمد</p>
            </div>
            <div className='p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all text-center'>
              <h4 className='text-slate-800 font-black text-3xl'>+10k</h4>
              <p className='text-slate-400 text-sm font-bold'>مريض يثق في عَوْن</p>
            </div>
          </div>
        </div>
      </div>

      {/* قسم المميزات */}
      <div className='mt-32'>
        <div className='text-2xl md:text-3xl font-black text-slate-800 mb-16 text-right border-r-8 border-teal-600 pr-6'>
          <p>لماذا تختار <span className='text-teal-600'>عَوْن؟</span></p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {title: "الكفاءة العالية", desc: "نظام حجز سلس يحترم وقتك، ويوفر عليك عناء البحث والانتظار في العيادات.", icon: "⚡", color: "bg-amber-50 text-amber-600"},
            {title: "سهولة الوصول", desc: "شبكة واسعة تغطي كافة المحافظات لتجد طبيبك المفضل بضغطة زر واحدة.", icon: "📍", color: "bg-teal-50 text-teal-600"},
            {title: "أمانك أولاً", desc: "خصوصية بياناتك وسجلك الطبي خط أحمر؛ نستخدم أقوى تقنيات التشفير لحمايتك.", icon: "🔒", color: "bg-slate-100 text-slate-600"}
          ].map((item, index) => (
            <div key={index} className='p-10 bg-white border border-slate-50 rounded-[3rem] hover:bg-slate-900 transition-all duration-500 cursor-default group shadow-sm hover:shadow-2xl relative overflow-hidden text-right'>
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 mr-0 ml-auto`}>
                {item.icon}
              </div>
              <b className='text-2xl text-slate-800 mb-4 block group-hover:text-white transition-colors'>{item.title}:</b>
              <p className='text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors'>{item.desc}</p>
              
              <div className='absolute -bottom-4 -left-4 w-24 h-24 bg-teal-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About