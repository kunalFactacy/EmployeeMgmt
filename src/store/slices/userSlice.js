import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: {
        name: '',
        email: '',
        avatar: null,
    },
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
        setAvatar: (state, action) => {
            state.profile.avatar = action.payload;
        },
        clearProfile: (state) => {
            state.profile = { name: '', email: '', avatar: null };
        },
    },
});

export const { updateProfile, setAvatar, clearProfile } = userSlice.actions;
export default userSlice.reducer;