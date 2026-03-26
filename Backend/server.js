import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.set('socketio', io)

io.on('connection', (socket) => {
    socket.on('join_room', (userId) => {
        socket.join(userId)
    })
})

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running 🚀"
    })
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

httpServer.listen(port, () => {
    console.log(`🚀 Server running on: http://localhost:${port}`);
})