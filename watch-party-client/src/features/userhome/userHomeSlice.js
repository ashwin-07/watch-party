import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    roomId: null,
    isCreate: false,
    isJoin: false,
    isError: false,
    message: null
}

const userHomeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        createRoomStart(state) {
            state.isCreate = true
            state.isJoin = false;
            state.loading = true
        },
        createRoomSuccess(state, action) {
            state.roomId = action.payload.roomId;
            state.loading = false
            state.isError = false
            state.message = "Room created"
        },
        createRoomFailure(state, action) {
            state.loading = false
            state.isError = true
            state.message = action.payload.message
        },
        joinRoomStart(state) {
            state.isCreate = false
            state.isJoin = true;
            state.loading = true
        },
        joinRoomSuccess(state, action) {
            state.roomId = action.payload.roomId
            state.loading = false
            state.isError = null
        },
        joinRoomFailure(state, action) {
            state.loading = false
            state.isError = true
            state.message = action.payload.message
        }
    }
})

export const {
    createRoomStart,
    createRoomSuccess,
    createRoomFailure,
    joinRoomStart,
    joinRoomSuccess,
    joinRoomFailure
} = userHomeSlice.actions

export default userHomeSlice.reducer