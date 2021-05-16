import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let initialState = {
    currentId: null,
    isPlaying: false,
    timeStamp: 0,
    error: null
}

const videoPlayer = createSlice({
    name: 'videoPlayer',
    initialState,
    reducers: {
        playVideo(state, action) {
            state.isPlaying = true;
            state.timeStamp = action.payload.timeStamp || 0;
            state.currentId = action.payload.videoId;
        },
        pauseVideo(state, action) {
            state.timeStamp = action.payload.timeStamp;
            state.isPlaying = false;
        },
        changeVideo(state, action) {
            state.currentId = action.videoId
        },
        playbackError(state, action) {
            state.error = action.error
            state.isPlaying = false
        },
    }
})

export const {
    playVideo,
    pauseVideo,
    changeVideo,
    playbackError
} = videoPlayer.actions

export default videoPlayer.reducer