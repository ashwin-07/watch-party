import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    isAdmin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeUser(state, action) {
            state.username = action.payload.username
            state.isAdmin = action.payload.isAdmin
        },
    }
})

export const {
    initializeUser
} = userSlice.actions

export default userSlice.reducer