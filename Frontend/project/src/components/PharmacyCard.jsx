import React from 'react';

const PharmacyCard = ({ name, address, phone }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group" dir="rtl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          🏥
        </div>
        <div className="text-right">
          <h3 className="font-black text-slate-800 dark:text-white text-lg">{name}</h3>
          <p className="text-xs text-slate-400 font-bold mt-1">{address}</p>
        </div>
      </div>
      <button className="w-full py-3.5 bg-slate-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 rounded-2xl font-black text-sm hover:bg-teal-600 hover:text-white transition-all">
        تصفح الأدوية
      </button>
    </div>
  );
};

export default PharmacyCard;