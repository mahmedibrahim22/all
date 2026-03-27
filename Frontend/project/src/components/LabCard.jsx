import React from 'react';

const LabCard = ({ name, homeService }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden group" dir="rtl">
      {homeService && (
        <div className="absolute top-4 left-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-lg text-[10px] font-black tracking-tighter">
          زيارة منزلية ✅
        </div>
      )}
      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:rotate-6 transition-transform">
        🧪
      </div>
      <div className="text-right">
        <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">{name}</h3>
        <p className="text-slate-400 text-xs font-bold leading-relaxed mb-6">نقدم أدق النتائج بأحدث الأجهزة العالمية.</p>
      </div>
      <div className="flex gap-2">
        <button className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs transition-all">حجز زيارة</button>
        <button className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-black text-xs hover:bg-slate-100 transition-all">الأسعار</button>
      </div>
    </div>
  );
};

export default LabCard;