import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers

        if (!atoken) {
            return res.json({ success: false, message: 'غير مسموح لك بالدخول، سجل دخول كأدمن أولاً' })
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'بيانات الاعتماد غير صالحة، سجل الدخول مجدداً' })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى' })
    }
}

export default authAdmin;