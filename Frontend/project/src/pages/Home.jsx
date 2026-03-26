import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='relative min-h-screen transition-colors duration-300'>
      
      {/* لمسات فنية متفاعلة مع الدارك مود */}
      <div className='absolute top-0 right-0 w-[50%] h-[500px] bg-gradient-to-bl from-teal-50/50 dark:from-teal-900/20 to-transparent -z-10'></div>
      <div className='absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-50/40 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10 animate-pulse'></div>

      <div className='pt-10'>
        <Header />
      </div>

      {/* سيكشن التخصصات */}
      <div className='py-24 container mx-auto px-6'>
         <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4'>
              تخصصات <span className='text-teal-600 dark:text-teal-400'>عَوْن</span> الطبية
            </h2>
            <p className='text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium'>
              اختر التخصص الذي تحتاجه واحجز موعدك بسهولة مع نخبة من أفضل الأطباء المعتمدين
            </p>
         </div>
         <SpecialityMenu />
      </div>

      {/* سيكشن الأطباء */}
      <div className='px-4 md:px-12 py-10'>
         <div className='bg-[#fcfdfe] dark:bg-slate-800/50 rounded-[3.5rem] py-24 border border-slate-50 dark:border-slate-700 shadow-sm'>
            <div className='container mx-auto'>
                <div className='text-center mb-12'>
                  <span className='bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-4 py-1.5 rounded-full text-xs font-black tracking-widest'>المتميزون</span>
                  <h2 className='text-3xl font-black text-slate-900 dark:text-white mt-4'>نخبة أطباء عَوْن</h2>
                </div>
                <TopDoctors />
            </div>
         </div>
      </div>

      <div className='container mx-auto px-6 py-20'>
        <Banner />
      </div>

    </div>
  )
}

export default Home