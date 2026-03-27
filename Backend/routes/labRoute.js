import express from 'express';
import { registerLab, getLabs, bookTest } from '../controllers/labController.js';

const labRouter = express.Router();

// تسجيل معمل تحاليل
labRouter.post('/register', registerLab);

// جلب قائمة المعامل
labRouter.get('/all', getLabs);

// حجز موعد تحليل منزلي
labRouter.post('/book', bookTest);

export default labRouter;