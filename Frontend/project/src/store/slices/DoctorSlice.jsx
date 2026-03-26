import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctors: [], // دي المصفوفة اللي بنخزن فيها الدكاترة
    loading: false,
    error: null
};

const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        // ✅ لازم دي تكون موجودة عشان الـ AppContext يقدر ينادي عليها
        setDoctors: (state, action) => {
            state.doctors = action.payload;
        },
        // ممكن تضيف reducers تانية هنا لو حابب (زي setLoading)
    },
});

// ✅ السطر ده هو اللي مسبب الخطأ عندك، لازم تعمل export للـ actions
export const { setDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;