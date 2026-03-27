import React from 'react';

const MedicineCard = ({ name, price, category }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center group transition-all hover:border-teal-500/30" dir="rtl">
      <div className="w-full aspect-square bg-slate-50 dark:bg-[#0f172a] rounded-[2rem] flex items-center justify-center text-5xl mb-4 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-all duration-500">
        💊
      </div>
      <span className="text-[10px] font-black bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 px-3 py-1 rounded-full uppercase mb-2">
        {category || 'متوفر'}
      </span>
      <h3 className="font-black text-slate-800 dark:text-white mb-1">{name}</h3>
      <p className="text-teal-600 font-black text-lg mb-4">{price} ج.م</p>
      
      <button className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-xs shadow-lg shadow-teal-600/20 transition-all active:scale-95">
        اطلب الآن
      </button>
    </div>
  );
};

export default MedicineCard;