import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

const Playlist = (props) => {
    const useStyles = makeStyles((theme) => ({
        addBtn: {
            margin: '0px 5px !important',
            display: 'inline'
        },
        addBtnContainer: {
            verticalAlign: 'center'
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
        videoUrlInput: {
            width: '75%'
        }
    }));

    const { socket } = props;

    // let playlistItems = [{videoId:'1'}, {videoId:'2'}, {videoId:'3'}]
    const { roomId, playlistItems } = useSelector(
        (state) => {
            return {
                roomId: state.room.roomId,
                playlistItems: state.room.videos,
            }
        }
    )

    //url to get video details
    //https://noembed.com/embed?url=https://www.youtube.com/watch?v=cQVFYVMhPlw

    const classes = useStyles();

    const [videoUrl, setVideoUrl] = useState('')
    const [isVideoUrlValid, setVideoUrlValid] = useState(true)

    const getVideoId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : false;
    }

    const addVideo = () => {
        let videoId = getVideoId(videoUrl);
        if (videoId) {
            socket.emit('addVideoToPlaylist', { 'room': roomId, 'url': videoUrl, videoId }, (response) => {
                if (!response.isSuccess) {
                    //TODO alert handling
                    // console.log(response.message);
                }
            })
        }
        else {
            setVideoUrlValid(false)
        }
    }

    return (
        <React.Fragment>

            <Box className={classes.addBtnContainer}>
                <TextField
                    id="outlinedbasic"
                    label="Video URL"
                    variant="outlined"
                    size="small"
                    className={classes.videoUrlInput}
                    error={!isVideoUrlValid}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    helperText={isVideoUrlValid ? "" : "Provide a valid youtube video URL"}
                />

                {/* <Grid item alignItems="stretch" style={{ display: "flex" }}> */}
                <Tooltip title="Add to playlist" aria-label="add video">
                    <IconButton varient="contained" aria-label="add video button" className={classes.addBtn}>
                        <AddBoxIcon
                            fontSize="large"
                            onClick={() => addVideo()}
                        />
                    </IconButton>
                </Tooltip>
                {/* </Grid> */}
            </Box>

            <Box>
                <List>
                    {
                        playlistItems.map(
                            (playlistItem) =>
                                <ListItem key={playlistItem.videoId.toString()}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                </ListItem>
                        )
                    }
                </List>
            </Box>
            {/* <Box className={classes.addBtnContainer}>
            </Box> */}
        </React.Fragment>
    )
}

export default Playlist
