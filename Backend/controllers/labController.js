import labModel from "../models/labModel.js";

// تسجيل معمل تحاليل
const registerLab = async (req, res) => {
    try {
        const { name, phone, tests, homeService, password } = req.body;
        const newLab = new labModel({ name, phone, tests, homeService, password });
        await newLab.save();
        res.json({ success: true, message: "تم تسجيل المعمل بنجاح" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// جلب كل المعامل
const getLabs = async (req, res) => {
    try {
        const labs = await labModel.find({}).select("-password");
        res.json({ success: true, labs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// حجز تحليل (هنا نفترض وجود موديل حجوزات منفصل مستقبلاً)
const bookTest = async (req, res) => {
    try {
        const { labId, testName, userId, slotDate } = req.body;
        // هنا يتم إنشاء سجل حجز مشابه لحجوزات الأطباء
        res.json({ success: true, message: "تم استلام طلب التحليل، سيتم التواصل معك" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { registerLab, getLabs, bookTest };