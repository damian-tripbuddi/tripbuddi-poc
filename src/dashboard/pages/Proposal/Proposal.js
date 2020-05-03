import React, { useState, useEffect, useRef, useReducer, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { DataStore } from '@aws-amplify/datastore';
import { Message } from '../../../models';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ProposalAppBar from '../../components/ProposalAppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth from '@aws-amplify/auth';
import { useLocation } from 'react-router-dom';
import UserProfileService from '../../services/UserProfileService';
import Box from '@material-ui/core/Box';
import moment from 'moment';

//import VideoPreCall from './components/VideoPreCall';

import ChatSection from '../../components/ChatSection';
import VideoCallSection from '../../components/VideoCallSection';

import proposalNavigationReducer, { initialNavigationState } from './proposalNavigationReducer';

import ProposalNavigationContext from './ProposalNavigationContext';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  messageList: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  propsoalArea: {
    height: '100vh',
    background: '#f9f9f7',
    overflow: 'hidden',
    '&.videoMini': {
      overflow: 'scroll',
    },
  },
}));

const Proposal = () => {
  const classes = useStyles();

  const location = useLocation();

  const [navigationState, dispatchNavigation] = useReducer(proposalNavigationReducer, initialNavigationState);

  const [messages, setMessages] = useState([]);

  const currentAuthenticatedUser = useRef(null);

  const sendMessage = async (message) => {
    if (!message) return;
    const newMessage = new Message({ message, user: currentAuthenticatedUser.current.username, channel: location.pathname, localCreatedAt: new Date().toISOString() });
    await DataStore.save(newMessage);
  };

  useEffect(() => {
    fetchMessages();
    const subscription = DataStore.observe(Message, (m) => m.channel('eq', location.pathname)).subscribe(() => {
      fetchMessages();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [location.pathname, fetchMessages]);

  useEffect(() => {
    const getCurrentUser = async () => {
      currentAuthenticatedUser.current = await Auth.currentAuthenticatedUser();
    };
    getCurrentUser();
  }, []);

  const decorateWithProfileInfo = async (message) => {
    const userProfile = await UserProfileService.getUserProfile(message.user);
    const decoratedMessage = {
      ...message,
      messageDate: !!message.createdAt ? moment(message.createdAt).fromNow().toString() : moment(message.localCreatedAt).fromNow().toString(),
      userAvatar: userProfile.avatar,
      userPreferredName: userProfile.preferredName,
      userAvatarShortText: userProfile.preferredName
        .split(' ')
        .map((nameSplit) => {
          return nameSplit.charAt(0).toUpperCase();
        })
        .join(''),
    };
    return decoratedMessage;
  };

  const reduceMessages = (currentResult, message, currentIndex) => {
    if (currentIndex === 0) {
      message.messageLines = [message.message];
      return [message];
    }
    const lastResult = currentResult[currentResult.length - 1];
    if (lastResult.user === message.user && lastResult.messageDate === message.messageDate) {
      lastResult.messageLines.push(message.message);
      currentResult[currentResult.length - 1] = lastResult;
      return currentResult;
    }
    message.messageLines = [message.message];
    currentResult.push(message);
    return currentResult;
  };

  const fetchMessages = useCallback(async () => {
    const newMessages = await DataStore.query(Message, (m) => m.channel('eq', location.pathname));
    const sortedMessages = [...newMessages].sort((messageA, messageB) => {
      const messageADate = messageA.createdAt || messageA.localCreatedAt;
      const messageBDate = messageB.createdAt || messageB.localCreatedAt;

      if (new Date(messageADate) > new Date(messageBDate)) {
        return 1;
      } else {
        return -1;
      }
    });
    const decoratedMessages = await Promise.all(sortedMessages.map(decorateWithProfileInfo));

    const reducedMessages = decoratedMessages.reduce(reduceMessages, []);

    setMessages(reducedMessages);
  }, [location.pathname]);

  const navigationContextValue = useMemo(() => {
    return { navigationState, dispatchNavigation };
  }, [navigationState, dispatchNavigation]);

  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTallMobile = useMediaQuery('(max-width: 812px) and (orientation: landscape)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px) and (orientation: portrait), (width: 1024px) and (orientation: landscape)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  useEffect(() => {}, [isPortrait, isLandscape, isMobile, isTallMobile, isTablet, isDesktop]);

  return (
    <ProposalNavigationContext.Provider value={navigationContextValue}>
      <CssBaseline />
      <ProposalAppBar />
      <div className={classes.root}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: navigationState.isMessageSectionOpen,
          })}>
          <VideoCallSection />
          <Box className={clsx(classes.propsoalArea, { videoMini: navigationState.isMiniVideoCall })}>
            <div className={classes.toolbar} />
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
          </Box>
        </main>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          classes={{
            paper: classes.drawerPaper,
          }}
          open={navigationState.isMessageSectionOpen}
          anchor='right'>
          <ChatSection messages={messages} fetchMessages={fetchMessages} sendMessage={sendMessage} />
        </Drawer>
      </div>
    </ProposalNavigationContext.Provider>
  );
};

export default Proposal;
