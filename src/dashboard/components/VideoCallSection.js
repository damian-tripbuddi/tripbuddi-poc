import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import VideocamIcon from '@material-ui/icons/Videocam';
//import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
//import MicOffIcon from '@material-ui/icons/MicOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
//import CallIcon from '@material-ui/icons/Call';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import ProposalNavigationContext from '../pages/Proposal/ProposalNavigationContext';
const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  main: {
    background: '#191919',
    top: 56 + 5,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 + 5,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
    bottom: 0,
    left: 0,
    position: 'absolute',
    transition: theme.transitions.create(['right', 'width', 'height'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    right: 0,
    '&.shift': {
      transition: theme.transitions.create(['right', 'width', 'height'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      right: 0 + drawerWidth,
      '&.mini': {
        transition: theme.transitions.create(['right', 'width', 'height'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        right: 0,
        display: 'block',
      },
    },
    '&.mini': {
      transition: theme.transitions.create(['right', 'width', 'height'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      top: 56 + 45,
      [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
        top: 48 + 45,
      },
      [theme.breakpoints.up('sm')]: {
        top: 64 + 45,
      },
      display: 'none',
      left: 'unset',
      width: 400,
      height: 200,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  currentAvatar: {
    width: 250,
    height: 250,
    '&.shift': {},
    '&.mini': {
      width: 250 / 2,
      height: 250 / 2,
    },
  },
  myAvatar: {
    width: 75,
    height: 75,
    '&.shift': {},
    '&.mini': {
      width: 75 / 2,
      height: 75 / 2,
    },
  },
  myAvatarContainer: {
    width: '40%',
    maxWidth: 400,
    minWidth: 200,
    height: '30%',
    minHeight: 100,
    maxHeight: 400,
    zIndex: theme.zIndex.drawer - 1,
    background: 'black',
    position: 'absolute',
    bottom: 0,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    right: 0,
    '&.shift': {
      transition: theme.transitions.create('right', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    '&.mini': {
      width: 150,
      height: 75,
      minWidth: 150,
      minHeight: 75,
      transition: theme.transitions.create('right', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      zIndex: theme.zIndex.drawer + 2,
    },
  },
  avatarGroupAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  videoCallButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 3,
    '&.mini': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  changeVideoSizeButton: {
    '&.mini': {
      transform: 'rotate(180deg)',
    },
  },
}));

const VideoCallSection = () => {
  const classes = useStyles();

  const { navigationState, dispatchNavigation } = useContext(ProposalNavigationContext);

  return (
    <div>
      <Box
        className={clsx(classes.main, {
          shift: navigationState.isMessageSectionOpen,
          mini: navigationState.isMiniVideoCall,
        })}>
        <Box justifyContent='center' alignItems='center' height='100%' display='flex'>
          <Avatar className={clsx(classes.currentAvatar, { mini: navigationState.isMiniVideoCall })} />
        </Box>
        <Box justifyContent='center' position='absolute' left={0} bottom={navigationState.isMiniVideoCall ? 50 : '15%'} right={0} alignItems='center' display='flex'>
          <Fab className={clsx(classes.videoCallButton, { mini: navigationState.isMiniVideoCall })} color='primary' aria-label='video' size={navigationState.isMiniVideoCall ? 'small' : 'large'}>
            <VideocamIcon />
          </Fab>
          <Fab className={clsx(classes.videoCallButton, { mini: navigationState.isMiniVideoCall })} color='primary' aria-label='microphone' size={navigationState.isMiniVideoCall ? 'small' : 'large'}>
            <MicIcon />
          </Fab>
          <Fab
            onClick={() => {
              dispatchNavigation({ type: 'openMessageSection' });
              dispatchNavigation({ type: 'toggleIsMiniVideoCall' });
            }}
            className={clsx(classes.videoCallButton, classes.changeVideoSizeButton, { mini: navigationState.isMiniVideoCall })}
            color='primary'
            aria-label='pictureinpicture'
            size={navigationState.isMiniVideoCall ? 'small' : 'large'}>
            <PictureInPictureIcon />
          </Fab>
          <Fab className={clsx(classes.videoCallButton, { mini: navigationState.isMiniVideoCall })} color='secondary' aria-label='microphone' size={navigationState.isMiniVideoCall ? 'small' : 'large'}>
            <CallEndIcon />
          </Fab>
        </Box>
        <Box justifyContent='center' className={clsx(classes.myAvatarContainer, { mini: navigationState.isMiniVideoCall, shift: navigationState.isMessageSectionOpen })} alignItems='center' display='flex'>
          <Avatar className={clsx(classes.myAvatar, { mini: navigationState.isMiniVideoCall, shift: navigationState.isMessageSectionOpen })} />
        </Box>
        <Box position='absolute' left={50} top={50} hidden={navigationState.isMiniVideoCall}>
          <AvatarGroup>
            <Avatar className={classes.avatarGroupAvatar} />
            <Avatar className={classes.avatarGroupAvatar} />
            <Avatar className={classes.avatarGroupAvatar} />
            <Avatar className={classes.avatarGroupAvatar} />
          </AvatarGroup>
        </Box>
      </Box>
    </div>
  );
};

export default VideoCallSection;
