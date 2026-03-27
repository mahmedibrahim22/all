const Medicine = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] p-6 flex items-center justify-center" dir="rtl">
            <div className="max-w-4xl w-full bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2 aspect-square bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-8xl shadow-inner">💊</div>
                
                <div className="flex flex-col justify-center">
                    <span className="text-teal-600 dark:text-teal-400 font-bold text-sm mb-2">قسم المسكنات</span>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4">بانادول إكسترا</h1>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">يستخدم لتسكين الآلام الخفيفة والمتوسطة بفعالية سريعة.</p>
                    
                    <div className="mb-8">
                        <span className="text-sm text-slate-400 block">السعر</span>
                        <span className="text-3xl font-black text-teal-600">45.00 ج.م</span>
                    </div>

                    <button className="py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-teal-600/20 transition-all transform active:scale-95">
                        إضافة إلى سلة الطلبات (اطلب)
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Medicine