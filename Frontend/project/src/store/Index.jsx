import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import doctorReducer from './slices/DoctorSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        doctors: doctorReducer, // ✅ تأكد إنها doctors بالجمع
    },
});