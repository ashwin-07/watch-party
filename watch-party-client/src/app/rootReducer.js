import { combineReducers } from '@reduxjs/toolkit'
import homeReducer from "../features/userhome/userHomeSlice"
import roomReducer from "../features/room/RoomSlice"
import userReducer from "../features/room/UserSlice"
import videoPlayerReducer from "../features/room/player/PlayerSlice"
import playlistReducer from "../features/room/playlist/PlaylistSlice"

const rootReducer = combineReducers({
  home: homeReducer,
  room: roomReducer,
  user: userReducer,
  videoPlayer: videoPlayerReducer,
  playlist: playlistReducer
})

export default rootReducer
