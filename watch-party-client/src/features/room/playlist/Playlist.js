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
import { useSelector } from 'react-redux';
import PreviewCard from './PreviewCard';
import { Typography } from '@material-ui/core';

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
        },
        playlistContainer: {
            maxHeight: '60vh',
            overflow: 'auto'
        }
    }));

    const { socket } = props;
    const { roomId, playlistItems, isAdmin } = useSelector(
        (state) => {
            return {
                roomId: state.room.roomId,
                playlistItems: state.room.videos,
                isAdmin: state.user.isAdmin
            }
        }
    )

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
                    setVideoUrlValid(false)
                }
            })
        }
        else {
            setVideoUrlValid(false)
        }
    }

    return (
        <React.Fragment>
            { isAdmin && <Box className={classes.addBtnContainer}>
                <TextField
                    id="outlinedbasic"
                    label="Video URL"
                    variant="outlined"
                    size="small"
                    className={classes.videoUrlInput}
                    error={!isVideoUrlValid}
                    style={{ marginTop: '10px' }}
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
            }
            <Box className={classes.playlistContainer}>
                <List>
                    {
                        playlistItems.length > 0 ?
                            playlistItems.map(
                                (itemDetails) =>
                                    <ListItem key={itemDetails.videoId.toString()}>
                                        <PreviewCard previewDetails={itemDetails} />
                                    </ListItem>
                            ) :
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Typography>No videos found in playlist</Typography>
                            </Box>
                    }
                </List>
            </Box>
        </React.Fragment>
    )
}

export default Playlist
