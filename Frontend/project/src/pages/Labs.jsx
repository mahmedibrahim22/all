const Labs = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] p-6 transition-colors" dir="rtl">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-10 text-center">معامل التحاليل والخدمة المنزلية</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-600/30">🧪</div>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-lg tracking-tighter">متاح زيارة منزلية</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">معامل البرج</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">أحدث الأجهزة العالمية لنتائج دقيقة وسريعة مع خدمة سحب العينات من المنزل.</p>
                        
                        <div className="flex gap-4">
                            <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all">حجز زيارة منزلية</button>
                            <button className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100">الأسعار</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Labs