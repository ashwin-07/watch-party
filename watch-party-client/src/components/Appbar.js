import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "5vh"
  },
  appBar: {
    alignItems: 'center'
  },
  title: {
    flexGrow: 1,
  },
}));

const Appbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Box letterSpacing={10} m={1}>
              WATCH TOGETHER
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar