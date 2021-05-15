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
    videos: [],
    participants:[]
}


const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        initializeRoom(state, action) {
            state.roomId = action.payload.roomId;
            if (action.payload.playlist) {
                state.videos = action.payload.playlist;
            }
            if (action.payload.participants) {
                state.participants = action.payload.participants;
            }
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
        },
        addParticipant(state, action) {
            state.participants = [...state.participants, action.payload]
        }
    }
})

export const {
    initializeRoom,
    showError,
    showInfo,
    addChatMessage,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    addParticipant
} = roomSlice.actions


export default roomSlice.reducer