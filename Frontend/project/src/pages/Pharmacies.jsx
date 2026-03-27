import React, { useState } from 'react';

const Pharmacies = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] p-6 transition-colors duration-300" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">الصيدليات المتاحة</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">ابحث عن الدواء أو الصيدلية الأقرب إليك</p>
                </header>

                {/* Search Section */}
                <div className="relative max-w-2xl mx-auto mb-12">
                    <input 
                        type="text" 
                        placeholder="ابحث عن اسم الدواء..." 
                        className="w-full p-4 pr-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-4 text-slate-400">🔍</span>
                </div>

                {/* Pharmacies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-2xl">🏥</div>
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">صيدلية عون المركزية</h3>
                                    <p className="text-xs text-slate-400">شارع المحطة، الزقازيق</p>
                                </div>
                            </div>
                            <button className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold text-sm hover:bg-teal-600 hover:text-white transition-all">
                                عرض الأدوية المتوفرة
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pharmacies;