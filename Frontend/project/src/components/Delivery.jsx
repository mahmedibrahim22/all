import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from "react-router-dom"; // 1. استيراد الهوك

const Delivery = () => {
  const navigate = useNavigate(); // 2. تعريف المتغير

  return (
    <div className="my-10 px-4 md:px-10" dir="rtl">
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
        
        <div className="flex-1 text-center md:text-right">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-4 leading-tight">
            خدمة التوصيل <span className="text-teal-600">المنزلي</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed max-w-xl">
            اطلب أدويتك ومستلزماتك الطبية من أقرب صيدلية ليك وهتوصلك لحد الباب في أسرع وقت.
          </p>
          {/* 3. استخدام navigate في الـ onClick */}
          <button 
            onClick={() => { navigate('/pharmacies'); window.scrollTo(0, 0); }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-teal-500/20 active:scale-95"
          >
            اطلب الآن
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <img 
            src={assets.appointment_img} 
            alt="Delivery" 
            className="w-full max-w-[400px] md:max-w-md drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Delivery;