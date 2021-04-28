import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Appbar'
import Player from './player/Player';
import RoomTabs from './RoomTabs';
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { showInfo } from "./RoomSlice";
import Alert from '../../components/Alert';
import { socket } from '../../utils/socketConnection'
import { useHistory } from "react-router-dom";
import { pauseVideo, playVideo } from "./player/PlayerSlice";
import { addChatMessage, addVideoToPlaylist } from './RoomSlice';

const useStyles = makeStyles(theme => ({
    root: {
        //padding:"20px"
    },
    playerWrapper: {
        backgroundColor: "#7d7d7d",
        maxHeight: "60vh",
    },
    title: {
        flexGrow: 1,
    },
    gridItem: {
        margin: "10px",
        display: "flex",
        flexDirection: "column",
    },
    roomTabsWrapper: {
        minHeight: "100%",
        backgroundColor: "red",
        maxHeight: "60vh"
    }

}));

const Room = props => {

    const classes = useStyles();
    let userName = props.location.state.userName;
    // let userId = props.location.state.userId;
    const [isAlertOpen, setAlertOpen] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();

    const { roomId, message, isError, isInfo } = useSelector(
        (state) => {
            return {
                roomId: state.home.roomId,
                message: state.room.message,
                isError: state.room.isError,
                isInfo: state.room.isInfo
            }
        }
    )

    useEffect(() => {

        if (roomId == null) {
            history.push("/");
        }
        socket.on("pausePlayer", data => {
            dispatch(pauseVideo(data))
            setAlertOpen(true)
            dispatch(showInfo({ message: "video has been paused" }))

        });

        socket.on("recieveChatMessage", data => {
            dispatch(addChatMessage(data))
        })

        socket.on("resumePlayer", data => {
            dispatch(playVideo(data))
            setAlertOpen(true)
            dispatch(showInfo({ message: "playing video" }))

        });

        socket.on("addVideoToPlaylist", data => {
            dispatch(addVideoToPlaylist(data))
        });

        return () => {
            if (socket != null) {
                socket.disconnect();
            }
        }
    }, [])

    return (
        <React.Fragment>
            <Header />
            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isAlertOpen}
                onClose={() => setAlertOpen(false)}
                message={message}
            >
                <Alert onClose={() => setAlertOpen(false)} severity="info">
                    {message}
                </Alert>
            </Snackbar>
            <Grid container direction='row' alignItems="stretch" className={classes.root}>
                <Grid item xs={12} md={7} className={classes.gridItem}>
                    <Paper className={classes.playerWrapper}>
                        <Player socket={socket} room={roomId} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} className={classes.gridItem}>
                    <Paper className={classes.roomTabsWrapper}>
                        <RoomTabs socket={socket} />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Room
