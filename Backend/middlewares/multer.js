import multer from "multer";

const storage = multer.diskStorage({
    // لازم نحدد مسار التخزين المؤقت (destination)
    filename: function (req, file, callback) {
        // بنستخدم التاريخ مع اسم الملف عشان نضمن إن الاسم ميتكررش
        callback(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage })

export default upload