import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import IconButton from '@material-ui/core/IconButton';
import useInputState from '../hooks/useInputState';

const useStyles = makeStyles((theme) => ({
  root: {},
  messageInputHolder: {
    boxShadow: '0px -2px 3px -1px rgba(0,0,0,0.5)',
    paddingLeft: '10px',
    backgroundColor: theme.palette.background.paper,
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%',
  },
  textField: {
    flexGrow: '1',
  },
  form: {
    display: 'flex',
  },
}));

const ChatInput = ({ sendMessage }) => {
  const classes = useStyles();

  const [currentMessage, setCurrentMessage, handleCurrentMessageChange] = useInputState('');

  const createMessage = async (e) => {
    if (e) e.preventDefault();
    if (!currentMessage) return;
    sendMessage(currentMessage);
    setCurrentMessage('');
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      createMessage();
    }
  };

  return (
    <div className={classes.messageInputHolder}>
      <form className={classes.form} onSubmit={createMessage} noValidate autoComplete='off'>
        <TextField id='message' multiline onKeyDown={onEnterPress} rowsMax={4} className={classes.textField} label='Message' variant='standard' onChange={handleCurrentMessageChange} value={currentMessage} />
        <IconButton onClick={createMessage} color='primary'>
          <SendSharpIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default ChatInput;
