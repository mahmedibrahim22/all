import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserData, loadUserProfile } from "../store/slices/UserSlice";
import { motion, AnimatePresence } from "framer-motion";

const egyptLocations = {
  "القاهرة": ["مصر الجديدة", "مدينة نصر", "المعادي", "حلوان", "شبرا"],
  "الجيزة": ["الدقي", "المهندسين", "الهرم", "فيصل", "أكتوبر"],
  "الشرقية": ["الزقازيق", "منيا القمح", "بلبيس", "مشتول السوق", "العاشر من رمضان"],
  "الإسكندرية": ["سموحة", "المنتزه", "محرم بك", "سيدي جابر"],
};

const MyProfile = () => {
  const { userData, token, backendUrl } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return "—";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(backendUrl + "/api/user/update-profile", formData, { headers: { token } });
      if (data.success) {
        toast.success("تم تحديث بياناتك بنجاح");
        await dispatch(loadUserProfile());
        setIsEdit(false);
        setImage(false);
      }
    } catch (error) {
      toast.error("عذراً، حدث خطأ أثناء التحديث");
    }
  };

  return userData ? (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] py-12 md:py-20 px-4"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8" dir="rtl">
        
        {/* الكارت الجانبي (الصورة) */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md p-10 rounded-[3rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm text-center sticky top-24">
            <label htmlFor="image" className="relative cursor-pointer inline-block group">
              <div className="w-44 h-44 rounded-[2.5rem] overflow-hidden border-8 border-slate-50 dark:border-slate-800 shadow-xl transition-all group-hover:shadow-teal-500/10">
                <img className={`w-full h-full object-cover transition-opacity duration-500 ${isEdit ? 'opacity-50' : 'opacity-100'}`} src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
              </div>
              <AnimatePresence>
                {isEdit && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-teal-600/10 rounded-[2.5rem] backdrop-blur-[2px]">
                    <img className="w-10 brightness-0 invert" src={assets.upload_icon} alt="Upload" />
                  </motion.div>
                )}
              </AnimatePresence>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            <div className="mt-8 space-y-2">
                {isEdit ? (
                    <input 
                        className="text-2xl font-black text-center w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-2 outline-none border-b-2 border-teal-500"
                        value={userData.name}
                        onChange={(e) => dispatch(setUserData({...userData, name: e.target.value}))}
                    />
                ) : (
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight">{userData.name}</h1>
                )}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/5 text-teal-600 dark:text-teal-400 text-[11px] font-black border border-teal-100 dark:border-teal-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                  عضو موثق في عَوْن
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* كارت البيانات الرئيسي */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md p-8 md:p-14 rounded-[3.5rem] border border-slate-200/60 dark:border-slate-800/50 shadow-sm transition-all">
            
            <SectionHeader title="بيانات الاتصال" icon="📱" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mt-6">
              <InfoBox label="البريد الإلكتروني" value={userData.email} readOnly />
              <InfoBox label="رقم الهاتف" value={userData.phone} isEdit={isEdit} onChange={(v) => dispatch(setUserData({...userData, phone: v}))} />
              <LocationSelector label="المحافظة" value={userData.address.line1} isEdit={isEdit} options={Object.keys(egyptLocations)} onChange={(v) => dispatch(setUserData({...userData, address: {...userData.address, line1: v, line2: ""}}))} />
              <LocationSelector label="المدينة / المنطقة" value={userData.address.line2} isEdit={isEdit} disabled={!userData.address.line1} options={userData.address.line1 ? egyptLocations[userData.address.line1] : []} onChange={(v) => dispatch(setUserData({...userData, address: {...userData.address, line2: v}}))} />
            </div>

            <div className="my-14 border-t border-slate-100 dark:border-slate-800/40"></div>

            <SectionHeader title="المعلومات الشخصية" icon="👤" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 items-end">
              <InfoBox label="الجنس" value={userData.gender === 'Male' ? 'ذكر' : 'أنثى'} isEdit={isEdit} type="select" currentVal={userData.gender} onChange={(v) => dispatch(setUserData({...userData, gender: v}))} />
              <InfoBox label="تاريخ الميلاد" value={userData.dob} isEdit={isEdit} type="date" onChange={(v) => dispatch(setUserData({...userData, dob: v}))} />
              
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] pr-2">العمر التقديري</p>
                <div className="h-[58px] px-6 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 rounded-[1.2rem] border border-slate-100 dark:border-slate-700/30">
                  <span className="text-xl font-black text-teal-600 dark:text-teal-400">{calculateAge(userData.dob)}</span>
                  <span className="text-[10px] font-bold text-slate-400">سنة</span>
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex justify-end mt-16 gap-5">
              {isEdit ? (
                <>
                  <button onClick={() => setIsEdit(false)} className="px-8 py-4 font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">إلغاء التعديل</button>
                  <button onClick={updateUserProfileData} className="px-12 py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black shadow-lg shadow-teal-500/20 active:scale-95 transition-all">حفظ التغييرات</button>
                </>
              ) : (
                <button onClick={() => setIsEdit(true)} className="group px-12 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:shadow-xl transition-all active:scale-95 flex items-center gap-3">
                  تعديل البيانات
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ) : null;
};

// مكونات فرعية بلمسة جمالية
const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-xl">{icon}</span>
    <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
  </div>
);

const LocationSelector = ({ label, value, isEdit, options, onChange, disabled }) => (
  <div className="space-y-3">
    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] pr-2">{label}</p>
    {isEdit ? (
      <select 
        disabled={disabled}
        className="w-full bg-slate-50 dark:bg-slate-800/60 p-4 rounded-[1.2rem] border border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>اختر {label}...</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    ) : <p className="font-bold text-slate-700 dark:text-slate-200 text-lg pr-2">{value || "غير محدد"}</p>}
  </div>
);

const InfoBox = ({ label, value, isEdit, onChange, type = "text", currentVal, readOnly }) => (
  <div className="space-y-3">
    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] pr-2">{label}</p>
    {isEdit && !readOnly ? (
      type === "select" ? (
        <select className="w-full bg-slate-50 dark:bg-slate-800/60 p-4 rounded-[1.2rem] border border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all" value={currentVal} onChange={(e) => onChange(e.target.value)}>
          <option value="Male">ذكر</option>
          <option value="Female">أنثى</option>
        </select>
      ) : (
        <input type={type} className="w-full bg-slate-50 dark:bg-slate-800/60 p-4 rounded-[1.2rem] border border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all" value={value} onChange={(e) => onChange(e.target.value)} />
      )
    ) : <p className={`font-bold text-lg pr-2 ${readOnly ? 'text-slate-400 font-medium' : 'text-slate-700 dark:text-slate-200'}`}>{value || "—"}</p>}
  </div>
);

export default MyProfile;