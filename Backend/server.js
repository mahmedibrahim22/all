import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

// الروابط
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import pharmacyRouter from './routes/pharmacyRoute.js'
import deliveryRouter from './routes/deliveryRoute.js'
import labRouter from './routes/labRoute.js'

const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)

// ✅ إعداد Socket.io مع السماح لجميع المصادر حالياً لحل مشاكل الاتصال
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// الاتصال بقواعد البيانات
connectDB()
connectCloudinary()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // بورتات الفرونت إيند بتاعتك
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json())

// إعداد Socket.io للوصول إليه من الـ Controllers
app.set('socketio', io)

io.on('connection', (socket) => {
    // console.log('User Connected:', socket.id) // مفيد للـ Debugging
    socket.on('join_room', (userId) => {
        socket.join(userId)
    })
})

// --- الروابط الأساسية ---
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)

// --- الروابط الجديدة لخدمات عون ---
app.use('/api/pharmacy', pharmacyRouter)
app.use('/api/delivery', deliveryRouter)
app.use('/api/labs', labRouter)

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running 🚀 | Aoun Platform API"
    })
});

// ✅ تحسين الـ Error Handling ليظهر تفاصيل أكثر في الـ Console عندك
app.use((err, req, res, next) => {
    console.error("❌ Backend Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ✅ تشغيل السيرفر باستخدام الـ httpServer (ضروري لعمل الـ Socket والـ API معاً)
httpServer.listen(port, () => {
    console.log(`🚀 Server running on: http://localhost:${port}`);
})