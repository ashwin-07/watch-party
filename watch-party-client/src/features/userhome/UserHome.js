import React from 'react'
import Header from '../../components/Appbar'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
    }
}));

const UserHome = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Header />
            <div className={classes.root}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12</Paper>
                    </Grid>
                    <Grid item xs={10} sm={5}>
                        <Paper className={classes.paper}>
                            <CreateRoom {...props} />
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={4} sm={2}>
                        <Typography variant="h5" className={classes.title}>
                                <Box letterSpacing={2} m={1}>
                                    &lt; OR &gt; 
                                </Box>
                            </Typography>
                    </Grid> */}
                    <Grid item xs={10} sm={5}>
                        <Paper className={classes.paper}>
                            <JoinRoom {...props} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default UserHome
