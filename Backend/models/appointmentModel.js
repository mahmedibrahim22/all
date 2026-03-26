import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    // ✅ الحقول الجديدة المطلوبة
    patientPhone: { type: String, required: true },
    patientAge: { type: String, default: "" },
    patientGender: { type: String, default: "ذكر" },
    illnessDescription: { type: String, default: "" },
    illnessImage: { type: String, default: "" } // رابط الصورة بعد رفعها
});

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);
export default appointmentModel;