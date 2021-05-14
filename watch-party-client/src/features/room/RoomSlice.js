import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    roomId: null,
    roomName: null,
    roomUrl: null,
    message: null,
    showToast: false,
    isError: false,
    isInfo: false,
    chatMessages: [],
    videos: []
}


const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        initializeRoom(state, action) {
            state.roomId = action.payload.roomId;
        },
        showError(state, action) {
            state.message = action.payload.message || "error occured"
            state.showToast = true
            state.isError = true
            state.isInfo = false
        },
        showInfo(state, action) {
            state.message = action.payload.message || "error occured"
            state.showToast = true
            state.isInfo = true
            state.isError = false
        },
        addChatMessage(state, action) {
            state.chatMessages = [...state.chatMessages, action.payload.messageDetails]
        },
        addVideoToPlaylist(state, action) {
            state.videos = [...state.videos, action.payload]
        },
        removeVideoFromPlaylist(state, action) {
            //TODO
        }
    }
})

export const {
    initializeRoom,
    showError,
    showInfo,
    addChatMessage,
    addVideoToPlaylist,
    removeVideoFromPlaylist
} = roomSlice.actions


export default roomSlice.reducer