
let { nanoid } = require("nanoid");
const Rooms = require("../model/Room");


createRoom = (req) => {
    let response = {message:'error creating room'}
    try{
        //todo filter input
        let {roomName, userName} = req;

        // addNewRoom()
        let roomId = nanoid(6)
        Rooms.createRoom(roomId, roomName);
        Rooms.addRoomAdmin(roomId, userName);
        response['id'] = roomId;
        response['message'] = 'room created successfully';
    }
    catch(e){
        console.log(e)
    }
    return response
}

module.exports = { createRoom };