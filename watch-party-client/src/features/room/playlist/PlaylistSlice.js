import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    videos: []
}

const playlist = createSlice({
    name:'videoPlayer',
    initialState,
    reducers:{
        addVideo(state, action) {
            state.videos = [...state.videos, action.payload.videoDetails]
        },
        removeVideo(state, action) {
            //TODO
        }
    }
})

export const {
    addVideo,
    removeVideo
  } = playlist.actions


  export default playlist.reducer