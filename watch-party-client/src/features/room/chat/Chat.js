import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { Fab } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  chatSection: {
    width: '100%',
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messagesContainer: {
    // height: '70vh',
    // height: '40vh', 
    // overflow: 'auto',

  },
  container: {
    height: '60vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    // position: "fixed" // remove this so we can apply flex design
  },
  bubbleContainer: {
    width: "100%",
    display: "flex" //new added flex so we can put div at left and right side
  },
  bubble: {
    maxWidth: '75%',
    border: "0.5px solid black",
    borderRadius: "10px",
    margin: "5px",
    padding: "5px",
    display: "inline-block"
  },
  senderName: {

  },
  right: {
    justifyContent: "flex-end !important"
    // justify-content: "flex-end !important",
  },
  left: {
    justifyContent: "flex-start !important"
    // justify-content: "flex-start !important",
  }
});

const Chat = (props) => {

  const { socket } = props
  const [currentMessage, setCurrentMessage] = useState('')
  const classes = useStyles();

  const { roomId, username, chatMessages } = useSelector(
    (state) => {
      return {
        roomId: state.room.roomId,
        username: state.user.username,
        chatMessages: state.room.chatMessages
      }
    }
  )

  const userChatBubble = (obj, i) => {
    return (
      <Box className={`${classes.bubbleContainer} ${obj.author === username ? classes.right : classes.left}`} key={i}>
        <Box className={classes.bubble}>
          {obj.author !== username && <Box fontWeight="fontWeightBold">{obj.author}</Box>}
          <Box className={classes.button}>{obj.message}</Box>
        </Box>
      </Box>
    )
  }
  const systemChatBubble = (obj, i) => {
    return (
      <Box className={`${classes.bubbleContainer} ${obj.author === username ? classes.right : classes.left}`} key={i}>
        <Box className={classes.bubble}>
          <Box className={classes.button}>{obj.message}</Box>
        </Box>
      </Box>
    )
  }

  const chatBubbles = chatMessages.map((obj, i) => (
    obj.type === 'user' ? userChatBubble(obj, i) : systemChatBubble(obj, i)
  ));


  const isMessageInvalid = () => {
    return (!currentMessage || currentMessage.trim().length === 0)
  }

  const sendMessage = () => {
    socket.emit('broadcastChatMessage', { 'room': roomId, 'author': username, 'message': currentMessage })
    setCurrentMessage("")
  }

  return (
    <React.Fragment>
      <Box className={classes.container}>
        <Box className={classes.messagesContainer}>
          {chatBubbles}
        </Box>
      </Box>
      <Divider />
      <Grid container style={{ padding: '10px' }}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            label="Type Something"
            fullWidth
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab color="primary" disabled={isMessageInvalid()} size="medium" aria-label="send message">
            <SendIcon onClick={() => sendMessage()} />
          </Fab>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Chat;