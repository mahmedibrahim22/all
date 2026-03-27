import React from 'react';
import { assets } from '../assets/assets.js';
// 1. استيراد اللوجو مباشرة من المسار الصحيح
import logoImg from '../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Icons = {
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Github: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
};

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='relative mt-40 bg-[#0f172a] text-slate-300 rounded-t-[3rem] md:rounded-t-[6rem] overflow-hidden border-t border-slate-800 text-right' dir="rtl">
      {/* الخط الضوئي العلوي */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent'></div>

      <div className='max-w-7xl mx-auto px-8 py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-16'>
          
          {/* سكشن اللوجو */}
          <div className='lg:col-span-2 space-y-8'>
            {/* 2. تم تغيير src ليقرأ الصورة المستوردة مباشرة */}
            <img 
                onClick={() => { handleNavigation('/home'); }} 
                className='w-48 md:w-64 cursor-pointer transition-all duration-500 hover:scale-105 filter dark:brightness-125 dark:drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]' 
                src={logoImg} 
                alt="Aoun Logo" 
            />
            
            <p className='text-slate-500 dark:text-slate-400 leading-9 text-lg max-w-lg font-medium'>
                نحن في منصة <span className='text-teal-600 dark:text-teal-400 font-bold'>عَوْن</span> نسعى لتسخير التكنولوجيا لخدمة صحة المريض المصري، ليكون الوصول لأفضل الأطباء تجربة بسيطة وسلسة.
            </p>
          </div>

          {/* روابط سريعة */}
          <div className='space-y-8'>
            <h3 className='text-xl font-black text-white flex items-center gap-3'>
              استكشف <span className='w-1.5 h-6 bg-teal-500 rounded-full inline-block'></span>
            </h3>
            <ul className='space-y-4'>
              {[
                { name: 'الرئيسية', path: '/' },
                { name: 'كل الأطباء', path: '/doctors' },
                { name: 'عن عَوْن', path: '/about' },
                { name: 'تواصل معنا', path: '/contact' }
              ].map((item, idx) => (
                <li key={idx} onClick={() => handleNavigation(item.path)} className='group cursor-pointer flex items-center gap-2 hover:text-teal-400 transition-colors font-bold text-slate-400'>
                  <Icons.ArrowLeft />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div className='space-y-8'>
            <h3 className='text-xl font-black text-white flex items-center gap-3'>
              تواصل مع عَوْن <span className='w-1.5 h-6 bg-teal-500 rounded-full inline-block'></span>
            </h3>
            <div className='space-y-6'>
              <div className='flex items-center gap-4 group cursor-pointer'>
                <div className='p-3 rounded-xl bg-slate-800/50 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all'><Icons.Phone /></div>
                <span className='text-sm font-bold text-slate-400 group-hover:text-teal-400' dir="ltr">+20 100 000 000</span>
              </div>
              <div className='flex items-center gap-4 group cursor-pointer'>
                <div className='p-3 rounded-xl bg-slate-800/50 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all'><Icons.Mail /></div>
                <span className='text-sm font-bold text-slate-400 group-hover:text-teal-400'>support@aoun-egypt.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* سطر الحقوق السفلي */}
        <div className='mt-20 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8'>
          <p className='text-slate-500 font-bold'>
            بكل فخر صُنع بواسطة <span className='text-teal-500 font-black tracking-tighter'>M. Ibrahim</span> — {new Date().getFullYear()} ©
          </p>
          <div className='flex gap-8 text-xs font-black uppercase tracking-widest text-slate-600'>
            <span className='hover:text-teal-400 cursor-pointer'>سياسة الخصوصية</span>
            <span className='hover:text-teal-400 cursor-pointer'>شروط الاستخدام</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;