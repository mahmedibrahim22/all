import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// دالة جلب بيانات البروفايل (Thunk)
export const loadUserProfile = createAsyncThunk(
    'user/loadUserProfile',
    async (_, { getState, rejectWithValue }) => {
        try {
            // ✅ دلوقتي backendUrl هيكون له قيمة من الـ state
            const { token, backendUrl } = getState().user; 
            
            if (!token || !backendUrl) return null;

            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token } 
            });

            if (data.success) {
                return data.userData;
            } else {
                return rejectWithValue(data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    token: localStorage.getItem('token') || '',
    userData: null,
    // ✅ تأكد إنك بتستخدم VITE_ قبل المتغير
    backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000" 
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem('token', action.payload);
            } else {
                localStorage.removeItem('token');
            }
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state.token = '';
            state.userData = null;
            localStorage.removeItem('token');
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUserProfile.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.status = 'succeeded';
                state.loading = false;
            })
            .addCase(loadUserProfile.rejected, (state, action) => {
                // ❗ ملحوظة: لا تمسح التوكن إلا لو كان الخطأ "Unauthorized"
                // لو السيرفر واقع (Network Error) مش عايزين نخرج المستخدم
                if (action.payload === 'Unauthorized' || action.payload === 'جلسة العمل انتهت، سجل دخول مجدداً') {
                    state.token = '';
                    state.userData = null;
                    localStorage.removeItem('token');
                }
                state.status = 'failed';
                state.loading = false;
            });
    }
});

export const { setToken, setUserData, logout } = userSlice.actions;
export default userSlice.reducer;