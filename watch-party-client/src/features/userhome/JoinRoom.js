import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { joinRoom } from './UserHomeEvents';
import { useSelector, useDispatch } from 'react-redux';
import {socket} from '../../utils/socketConnection';

const useStyles = makeStyles(theme => ({
    submit:{
        margin: theme.spacing(3, 0, 2),
      }
}));

const JoinRoom = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { loading, isError, roomId, message, isJoin} = useSelector(
        (state) => {
          return {
            loading: state.home.loading,
            isError: state.home.isError,
            roomId: state.home.roomId,
            message: state.home.message,
            isJoin: state.home.isJoin
          }
        }
    )

    let [isRoomCodeValid, setRoomCodeValid] = useState(true)
    let [isUserNameValid, setUserNameValid] = useState(true)

    const [userName, setUserName] = useState("");
    const [roomCode, setRoomCode] = useState("");

    if (roomId != null) {
        props.history.push({ pathname: `/room/${roomId}`, state: { userName }});
        // <Redirect to={{ pathname: `/room/${roomId}`, state: { username:"username" }}}/>
    }  

    if (isError) {
        //TODO Error Handling
    }

    const joinRoomSubmit = async () => {
        if (userName === "") {
            setUserNameValid(false)
            return;
        }
        if (roomCode === "") {
            setRoomCodeValid(false)
            return;
        }
        await dispatch(joinRoom(socket, userName, roomCode))
    }
    
    return(
        <React.Fragment>
            <Typography variant="h5" className={classes.title}>
                <Box letterSpacing={2} m={1}>
                    Join Room
                </Box>
            </Typography>
            <TextField
                id="outlined-name-input"
                label="Room Code"
                className={classes.textField}
                name="roomId"
                variant="outlined"
                margin="normal"
                onChange={(e) => {setRoomCode(e.target.value); setRoomCodeValid(true)}}
                helperText={isRoomCodeValid ? "" : "Provide a valid room code"}
            />
            <TextField
                id="outlined-name-input"
                label="User Name"
                className={classes.textField}
                name="User name"
                variant="outlined"
                margin="normal"
                onChange={(e) => {setUserName(e.target.value); setUserNameValid(true)}}
                helperText={isUserNameValid ? "" : "User Name cannot be empty"}
            />
            {loading ? <CircularProgress className={classes.submit} /> : 
                    <Button variant="contained" onClick={() => joinRoomSubmit()} color="primary" className={classes.submit}>
                        Join
                    </Button>
            }
            {
                isError && <div>{message}</div>
            }
        </React.Fragment>
    )
}

export default JoinRoom