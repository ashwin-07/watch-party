import { createRoomStart, createRoomSuccess, createRoomFailure, joinRoomStart, joinRoomSuccess, joinRoomFailure } from './userHomeSlice'
import { initializeRoom } from '../room/RoomSlice'
import { initializeUser } from '../room/UserSlice'

export const createRoom = (socket, userName, roomName) => {

    return async dispatch => {
        dispatch(createRoomStart())
        try {
            let data = { userName, roomName }
            socket.emit('createRoom', data, (response) => {
                if (response.isSuccess) {
                    dispatch(createRoomSuccess({ roomId: response.roomId }))
                    dispatch(initializeRoom({ roomId: response.roomId }))
                    dispatch(initializeUser({ username: userName, isAdmin: true }))
                }
                else {
                    dispatch(createRoomFailure({ message: response.message }))
                }
            })
        }
        catch (err) {
            dispatch(createRoomFailure({ message: "Unable to create room" }))
        }
    }
}

export const joinRoom = (socket, userName, roomId) => {

    return async dispatch => {
        dispatch(joinRoomStart())
        try {
            let data = { userName, roomId }
            socket.emit('joinRoom', data, (response) => {
                if (response.isSuccess) {
                    dispatch(joinRoomSuccess({ roomId: response.roomId }))
                    dispatch(initializeUser({ username: userName, isAdmin: false }))
                    dispatch(initializeRoom({ roomId: response.roomId }))
                }
                else {
                    dispatch(joinRoomFailure({ message: response.message }))
                }
            })
        }
        catch (err) {
            dispatch(createRoomFailure({ message: "Unable to join room" }))
        }
    }
}

//TODO remove the function
export const bindServerEvents = (socket, dispatch) => {
    // socket.on('dd',  data => {
    //     if (data.id) {
    //     }
    //     else {
    //         dispatch(createRoomFailure({message:data.message}))
    //     }
    // })

}