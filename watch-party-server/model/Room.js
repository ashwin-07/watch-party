const ActionFailedError = require('../utils/ActionFailedError')
const {createFailedAction, createSuccessAction} = require('../utils/helpers')

class Room {

    constructor(roomName){
        this.users = [];
        this.playlist = [];
        // this.messages = [];
        this.roomName = roomName;
        this.createdTime = Date.now();
        this.admin = [];
    }

    addUser() {
        this.users.append(userName);
    }

    addAdmin(user){
        this.admin.push(user);
    }


    addToPlayList(url){
        this.playlist.push(url);
    }

    getPlayList(){
        return this.playlist;
    }

    isUserInRoom(user) {
        this.users.get(use);
    }

}

class Rooms {

    constructor() {
        this.rooms = new Map();
    }

    createRoom(roomId, roomName){
        let newRoom = new Room(roomName);
        this.rooms.set(roomId, newRoom);
        return roomId;
    }

    addRoomAdmin(roomId, user){
        let room =  this.rooms.get(roomId);
        if (room) {
            room.addAdmin(user);
            // return new ActionResult(true, 'User added successfully'
        }
        else {
            // return new ActionResult(false , 'Room does not exist')
            throw new ActionFailedError('Room does not exist');
        }
    }

    addVideoToPlayList(roomId, videoDetails) {
        let room =  this.rooms.get(roomId);
        if (room) {
            room.addToPlayList(videoDetails);
            return createSuccessAction("video added to playlist");
        }
        else {
            return createFailedAction('Room does not exist');
        }
    }

    getPlaylistItems(roomId) {
        let room =  this.rooms.get(roomId);
        if (room) {
            return createSuccessAction("items fetched successfully",room.getPlayList());
        }
        else {
            return createFailedAction('Room does not exist');
        }
    }

    // addMessage(roomId, author, message) {
    //     let room =  this.rooms.get(roomId);
    //     if (room) {
    //         room.messages.push({
    //             'author':author,
    //              'message':message,
    //              'timeStamp': new Date().getMilliseconds()
    //         });
    //     }
    //     else {
    //         throw new ActionFailedError('Room does not exist');
    //     }
    // }

    doesRoomExist(roomId){
        return this.rooms.has(roomId);
    }

    addUserToRoom(roomId, user) {
        let room =  this.rooms.get(roomId);
        if (room) {
            if (room.users.indexOf(user) == -1) {
                room.users.push(user);
            }
            else {
                throw new ActionFailedError("Try a different username");
            }
        }
        else {
            throw new ActionFailedError('Room does not exist');
        }
    }

    getParticipants(roomId) {
        let room =  this.rooms.get(roomId);
        if (room) {
            return room.users
        }
        else {
            throw new ActionFailedError('Room does not exist');
        }
    }

}

module.exports = new Rooms();