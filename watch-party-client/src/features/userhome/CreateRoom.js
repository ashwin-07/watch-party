import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { createRoom, bindServerEvents } from './UserHomeEvents';
import { socket } from '../../utils/socketConnection';

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    }

}));

const CreateRoom = (props) => {

    const classes = useStyles()

    const { loading, isError, roomId, message, isCreate } = useSelector(
        (state) => {
            return {
                loading: state.home.loading,
                isError: state.home.isError,
                roomId: state.home.roomId,
                message: state.home.message,
                isCreate: state.home.isCreate
            }
        }
    )

    let [isRoomNameValid, setRoomNameValid] = useState(true)
    let [isUserNameValid, setUserNameValid] = useState(true)

    let [roomName, setRoomName] = useState("")
    let [userName, setUserName] = useState("")

    const dispatch = useDispatch()


    useEffect(() => {

        if (!socket.connected) {
            //TODO Error handling
        }

        bindServerEvents(socket, dispatch)
    }, [])


    if (roomId != null) {
        props.history.push({ pathname: `/room/${roomId}`, state: { userName } });
        // <Redirect to={{ pathname: `/room/${roomId}`, state: { username:"username" }}}/>
    }

    const hostRoom = async () => {
        if (roomName === "") {
            setRoomNameValid(false)
            return;
        }
        await dispatch(createRoom(socket, userName, roomName))
    }

    return (
        <React.Fragment>
            <Typography variant="h5" className={classes.title}>
                <Box letterSpacing={2} m={1}>
                    Create Room
                    </Box>
            </Typography>
            <TextField
                error={!isRoomNameValid}
                id="outlined-name-input"
                label="Room Name"
                className={classes.textField}
                name="Room name"
                margin="normal"
                variant="outlined"
                onChange={(e) => { setRoomName(e.target.value); setRoomNameValid(true) }}
                helperText={isRoomNameValid ? "" : "Room Name cannot be empty"}
            />
            <TextField
                error={!isUserNameValid}
                id="outlined-name-input"
                label="User Name"
                className={classes.textField}
                name="User name"
                margin="normal"
                variant="outlined"
                onChange={(e) => { setUserName(e.target.value); setUserNameValid(true) }}
                helperText={isUserNameValid ? "" : "User Name name cannot be empty"}
            />
            {loading ? <CircularProgress className={classes.submit} /> :
                <Button variant="contained" onClick={() => hostRoom()} color="primary" className={classes.submit}>
                    Create
                    </Button>
            }

            {
                isError && <div>{message}</div>
            }
        </React.Fragment>
    )

}

export default CreateRoom;