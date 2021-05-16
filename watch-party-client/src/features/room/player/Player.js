import React, { useEffect } from 'react'
import YouTube from 'react-youtube';
import { useSelector, useDispatch } from 'react-redux';
import { pause, play } from '../RoomEvents';
import { showInfo } from "../RoomSlice";
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const Player = (props) => {

  const dispatch = useDispatch()
  const playerRef = React.createRef();
  const opts = {  //video player options
    height: '420vh',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const { currentId, isPlaying, timeStamp, playbackError, roomId } = useSelector(
    (state) => {
      return {
        currentId: state.videoPlayer.currentId,
        isPlaying: state.videoPlayer.isPlaying,
        timeStamp: state.videoPlayer.timeStamp,
        playbackError: state.videoPlayer.playbackError,
        roomId: state.home.roomId
      }
    }
  )
  const { socket, room } = props

  const getCurrentPlayer = () => {
    if (playerRef.current)
      return playerRef.current.getInternalPlayer();
    else
      return null;
  };

  const onPlayerStateChange = (e) => {

    let { data } = e

    switch (data) {

      case 1: //play
        dispatch(play(socket, { videoId:currentId, "room": roomId, "timeStamp": e.target.getCurrentTime() }))
        break;

      case 2: //pause
        dispatch(pause(socket, { "room": roomId, "timeStamp": e.target.getCurrentTime() }))
        break;

      case 3: //video end
        break;

      default:
        break;

    }
  }

  useEffect(() => {
    let currentPlayer = getCurrentPlayer()
    if (currentPlayer) {
      if (!isPlaying) {
        currentPlayer.pauseVideo();
        currentPlayer.seekTo(timeStamp);
      }
      else {
        currentPlayer.playVideo();
        currentPlayer.seekTo(timeStamp);
      }
    }
  }, [isPlaying])


  return (
    <div>
      { currentId ?
        <YouTube class="react-player"
          ref={playerRef}
          videoId={currentId}
          opts={opts}
          onStateChange={onPlayerStateChange}

        /> :
        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
          <Typography style={{ color: 'white' }}>Add video to playlist to start streaming</Typography>
        </Box>
      }
    </div>
  )
}

export default Player
