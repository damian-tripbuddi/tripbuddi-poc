import React, { useState, useEffect, memo, useRef, useContext } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ChatInput from './ChatInput';
import clsx from 'clsx';
import ProposalNavigationContext from '../pages/Proposal/ProposalNavigationContext';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  messageList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: theme.mixins.toolbar,
  messageTopBuffer: {
    minHeight: 56 + 30,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: 48 + 30,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 64 + 30,
    },
  },
  messageTopBufferMakeSpaceForVideo: {
    minHeight: 56 + 230,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: 48 + 230,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 64 + 230,
    },
  },
  drawerHeader: {
    background: theme.palette.background.paper,
    position: 'absolute',
    left: '0',
    right: '0',
    top: 56 + 5,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48 + 5,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
    zIndex: theme.zIndex.drawer + 5,
  },
  preferredName: {
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(1),
  },
  messageDate: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
  },
  messageText: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    wordBreak: 'break-word',
    display: 'block',
    lineHeight: 1.4,
    marginTop: theme.spacing(1),
  },
}));

const PrimarySection = ({ message }) => {
  const classes = useStyles();
  return (
    <Box>
      <span className={classes.preferredName}>{message.userPreferredName}</span>
      <span className={classes.messageDate}>{!!message.createdAt ? moment(message.createdAt).fromNow().toString() : moment(message.localCreatedAt).fromNow().toString()}</span>
    </Box>
  );
};

const SecondarySection = ({ message }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {message.messageLines.map((text, index) => {
        return (
          <Typography key={index} component='span' variant='body2' className={classes.messageText} color='textPrimary'>
            {text}
          </Typography>
        );
      })}
    </React.Fragment>
  );
};

const ChatSection = ({ messages, sendMessage, fetchMessages }) => {
  const [hasHadMessagesOnce, setHasHadMessagesOnce] = useState(false);

  const messageListRef = useRef(null);

  const scrollBox = useRef(null);

  const classes = useStyles();

  const timer = useRef(null);

  const { navigationState, dispatchNavigation } = useContext(ProposalNavigationContext);

  const internalSendMessage = (message) => {
    sendMessage(message);
    scrollToBottom();
  };

  useEffect(() => {
    if (!hasHadMessagesOnce && messages.length > 0) {
      setHasHadMessagesOnce(true);
      scrollToBottom();
    }
  }, [hasHadMessagesOnce, messages]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      fetchMessages();
    }, 60000);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [fetchMessages]);

  const scrollToBottom = () => {
    scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
  };

  useEffect(() => {
    const visibleHeight = scrollBox.current.scrollHeight - scrollBox.current.offsetHeight;
    const scrollDistance = visibleHeight - scrollBox.current.scrollTop;
    if (scrollDistance < 160) {
      scrollToBottom();
      // if (messageListRef.current && messageListRef.current.childNodes.length > 0) {
      //   messageListRef.current.childNodes[messageListRef.current.childNodes.length - 1].scrollIntoView();
      // }
    }
  }, [messages]);

  return (
    <>
      <Box height='100%' display='flex' flexDirection='column' flexGrow={1} flexShrink={1} flexBasis='0%'>
        <Box ref={scrollBox} overflow='auto' display='flex' flexGrow={1} flexShrink={1} flexBasis='0%'>
          <Box width='100%'>
            <Box
              className={clsx(classes.messageTopBuffer, {
                [classes.messageTopBufferMakeSpaceForVideo]: navigationState.isMiniVideoCall,
              })}
            />
            <Box className={classes.drawerHeader} display='flex' justifyContent='flex-end'>
              <IconButton onClick={() => dispatchNavigation({ type: 'closeMessageSection' })}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <List className={classes.messageList} ref={messageListRef}>
              {messages.map((message, index) => {
                return (
                  <React.Fragment key={message.id}>
                    {/* {index > 0 ? <Divider variant='inset' component='li' /> : null} */}
                    <ListItem divider alignItems='flex-start'>
                      <ListItemAvatar>
                        <Avatar alt={message.userPreferredName} src={message.userAvatar}>
                          {message.userAvatarShortText}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={<PrimarySection message={message} />} secondary={<SecondarySection message={message} />} />
                    </ListItem>
                  </React.Fragment>
                );
              })}
            </List>
          </Box>
        </Box>
        <Box zIndex={1}>
          <ChatInput sendMessage={internalSendMessage} />
        </Box>
      </Box>
    </>
  );
};

export default memo(ChatSection);
