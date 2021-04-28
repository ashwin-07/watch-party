
import { pauseVideo, playVideo } from "./player/PlayerSlice";

export const pause = (socket, data) => {
	return dispatch => {
		dispatch(pauseVideo(data))
		socket.emit('pauseVideo',data)
	}
}

export const play = (socket, data) => {
	return dispatch => {
		dispatch(playVideo(data))
		socket.emit('playVideo',data)
	}
}

