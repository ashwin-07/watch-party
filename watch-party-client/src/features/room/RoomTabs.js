import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel'
import Playlist from './playlist/Playlist';
import Chat from './chat/Chat';
import Participants from './Participants'



function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height:"100%"
  },
  tabs:{
      height:"100%"
  }
}));

const RoomTabs = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {socket} = props

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Playlist" {...a11yProps(0)} />
          <Tab label="Chat" {...a11yProps(1)} />
          <Tab label="Participants" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} className={classes.tabs}>
          <Playlist socket={socket}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} className={classes.tabs}>
          <Chat socket={socket}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} className={classes.tabs}>
          <Participants/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default RoomTabs;