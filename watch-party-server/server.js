const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    }
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', ' GET,PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})


app.use(express.urlencoded({ extended: true }));

app.use(express.json())

const roomRoutes = require('./routes/roomRoute')
app.use('/api/room', roomRoutes);

let { nanoid } = require("nanoid");

const ActionFailedError = require("./utils/ActionFailedError")

const Rooms = require("./model/Room");

const { createRoom } = require('./controller/roomController')

const { getVideoDetails } = require('./utils/externalApis')

io.on("connection", socket => {
    const { id } = socket.client;
    console.log(`User connected: ${id}`);
    socket.on('disconnect', reason => {
        console.log(`user disconnected reason: ${reason}`);
    });

    socket.on('createRoom', (data, callback) => {
        try {
            let { roomName, userName } = data;
            let roomId = nanoid(6)
            Rooms.createRoom(roomId, roomName);
            Rooms.addRoomAdmin(roomId, userName);
            console.log(Rooms.getParticipants(roomId))
            Rooms.addUserToRoom(roomId, userName, true)
            let participants = Rooms.getParticipants(roomId)
            socket.join(roomId);
            callback({
                isSuccess: true,
                roomId,
                isAdmin: true,
                participants,
                message: 'room created successfully'
            });
        }
        catch (e) {
            console.log(e)
            callback({
                isSuccess: false,
                isAdmin: true,
                message: 'error creating room'
            });
        }
        // io.emit('roomcreated',response)
    });

    socket.on('joinRoom', (data, callback) => {
        const { id } = socket.client;
        const { roomId, userName } = data;
        try {
            Rooms.addUserToRoom(roomId, userName, false);
            let playlist = Rooms.getPlaylistItems(roomId);
            console.log(playlist)
            let participants = Rooms.getParticipants(roomId);
            socket.join(data.roomId);
            io.in(data.roomId).emit('addParticipant', { username: userName, isAdmin: false })
            let videoDetails = Rooms.getCurrentVideoDetails(roomId)
            callback({
                isSuccess: true,
                roomId,
                playlist,
                participants,
                currentVideoDetails: videoDetails,
                message: "joined room"
            })
        }
        catch (e) {
            console.log(e)
            let message = "Error occurred, please try later"
            if (e instanceof ActionFailedError) {
                message = e.message;
            }
            callback({
                isSuccess: false,
                message
            })
        }
    });

    socket.on('leave room', data => {
        socket.leave(data.room)
    });

    socket.on('broadcastSystemChatMessage', data => {
        let response = { room, author, message, type: 'system', 'timestamp': new Date().getMilliseconds() }
        io.in(data.room)
            .emit('recieveChatMessage', response)
    });

    socket.on('broadcastChatMessage', data => {
        let response = {}
        try {
            const clients = io.sockets.adapter.rooms.get(data.room);

            //to get the number of clients in this room
            // const numClients = clients ? clients.size : 0;
            // console.log('clients in room')
            // for (const clientId of clients ) {

            //     //this is the socket of each client in the room.
            //     const clientSocket = io.sockets.sockets.get(clientId);
            //     console.log(clientId)

            // }
            const { room, author, message } = data
            response["messageDetails"] = { room, author, message, type: 'user', 'timestamp': new Date().getMilliseconds() }
            io.in(data.room)
                .emit('recieveChatMessage', response)
        }
        catch (e) {
            console.log(e)
        }
    });

    socket.on('addVideoToPlaylist', async (data, callback) => {
        try {
            let { room, videoId, addedBy } = data
            let result = await Rooms.addVideoToPlayList(room, { videoId, addedBy })
            if (result.isSuccess) {
                callback({
                    isSuccess: true,
                })
                io.in(data.room).emit('addVideoToPlaylist', result.data)
                let playlistSize = Rooms.getPlayListSize(room)
                console.log(playlistSize)
                if (playlistSize == 1) {
                    let playerDetails = { videoId, timestamp: 0 }
                    Rooms.setCurrentVideoDetails(room,playerDetails)
                    io.in(data.room).emit("resumePlayer", playerDetails)
                }
            }
            else {
                callback({
                    isSuccess: false,
                    message: result.message
                })
            }
        }
        catch (e) {
            console.log(e)
            let message = "Error occurred, please try later"
            if (e instanceof ActionFailedError) {
                message = e.message;
            }
            callback({
                isSuccess: false,
                message: result.message
            })
        }
    });

    socket.on("pauseVideo", data => {
        io.in(data.room)
            .emit("pausePlayer", data)
    })
    socket.on("playVideo", data => {
        console.log(data)
        Rooms.setCurrentVideoDetails(data.room, data)
        io.in(data.room)
            .emit("resumePlayer", data)
    })
});


app.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
