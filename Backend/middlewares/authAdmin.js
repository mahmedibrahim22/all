import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) return res.json({ success: false, message: 'سجل دخول أولاً' })

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        // ✅ هنا السر: لازم نطابق اللي Terminal قاله بالظبط
        const adminKey = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

        if (token_decode !== adminKey) {
            console.log("❌ Mismatch! Token has:", token_decode);
            return res.json({ success: false, message: 'بيانات الاعتماد غير صالحة' })
        }

        next()
    } catch (error) {
        res.json({ success: false, message: 'انتهت الجلسة، سجل دخول مجدداً' })
    }
}
export default authAdmin;