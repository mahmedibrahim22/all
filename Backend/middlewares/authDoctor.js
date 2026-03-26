// middlewares/authDoctor.js
import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        // 1. استخراج التوكن من الهيدرز
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.status(401).json({ success: false, message: 'جلسة العمل انتهت، سجل دخول مجدداً' });
        }

        // 2. التحقق من التوكن
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        // 3. تخزين المعرف (مهم جداً: استخدم req.docId بدلاً من req.body لتجنب مشاكل الـ undefined)
        req.docId = token_decode.id; 
        
        // إذا كنت مضطراً لاستخدام req.body.docId (للتوافق مع باقي الكود):
        req.body = req.body || {}; 
        req.body.docId = token_decode.id;

        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        res.status(401).json({ success: false, message: 'توكن غير صالح' });
    }
};

export default authDoctor;