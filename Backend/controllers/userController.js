import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import { v2 as cloudinary } from 'cloudinary'

// تسجيل مستخدم جديد
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.json({ success: false, message: "بيانات ناقصة" })
        if (!validator.isEmail(email)) return res.json({ success: false, message: "بريد غير صحيح" })
        if (password.length < 8) return res.json({ success: false, message: "كلمة المرور ضعيفة" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({ name, email, password: hashedPassword })
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// تسجيل الدخول
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) return res.json({ success: false, message: "المستخدم غير موجود" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "بيانات خاطئة" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// حجز موعد (تمت إضافة رفع صورة الروشتة)
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime, patientPhone, patientAge, patientGender, illnessDescription } = req.body
        const imageFile = req.file // استقبال ملف الصورة من Multer

        const docData = await doctorModel.findById(docId).select("-password")
        if (!docData.available) return res.json({ success: false, message: "الطبيب غير متاح حالياً" })

        // رفع الصورة لـ Cloudinary إذا وجدت
        let illnessImageUrl = ""
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            illnessImageUrl = imageUpload.secure_url
        }

        let slots_booked = docData.slots_booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) return res.json({ success: false, message: "هذا الموعد محجوز بالفعل" })
            slots_booked[slotDate].push(slotTime)
        } else {
            slots_booked[slotDate] = [slotTime]
        }

        const userData = await userModel.findById(userId).select("-password")

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            patientPhone,
            patientAge,
            patientGender,
            illnessDescription,
            illnessImage: illnessImageUrl, // حفظ رابط الصورة في الداتابيز
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // تحديث المواعيد المحجوزة عند الدكتور
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "تم الحجز بنجاح" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// عرض قائمة مواعيد المستخدم
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// إلغاء الموعد
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        if (appointmentData.userId !== userId) return res.json({ success: false, message: "غير مصرح لك بهذا الإجراء" })

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { docId, slotDate, slotTime } = appointmentData
        const docData = await doctorModel.findById(docId)
        
        let slots_booked = docData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "تم إلغاء الموعد بنجاح" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// الحصول على بيانات الملف الشخصي
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select("-password")
        res.json({ success: true, userData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// تحديث الملف الشخصي
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        
        if (!name || !phone || !dob || !gender) return res.json({ success: false, message: "بيانات ناقصة" })

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            await userModel.findByIdAndUpdate(userId, { image: imageUpload.secure_url })
        }

        res.json({ success: true, message: "تم تحديث الملف الشخصي" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, bookAppointment, listAppointment, cancelAppointment, getProfile, updateProfile }