import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Typography } from '@material-ui/core';

const Participants = () => {


    const useStyles = makeStyles((theme) => ({
        usersContainer: {
            maxHeight: '60vh',
            overflow: 'auto'
        },
        adminIcon: {
            height: '2em'
        }
    }));

    const classes = useStyles();

    const { roomId, participants } = useSelector(
        (state) => {
            return {
                roomId: state.room.roomId,
                participants: state.room.participants,
            }
        }
    )

    return (
        <React.Fragment>
            <Box>
                <List>
                    {
                        participants.map(
                            (participant) =>
                                <ListItem key={participant.username.toString()}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {participant.username.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={participant.username} />
                                    <ListItemSecondaryAction>
                                        {participant.isAdmin &&
                                            <svg className={classes.adminIcon} viewBox="0 0 24 24">
                                                <path
                                                    d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"
                                                />
                                            </svg>
                                        }
                                    </ListItemSecondaryAction>
                                </ListItem>
                        )

                    }
                </List>
            </Box>
        </React.Fragment>
    )

}

export default Participants;