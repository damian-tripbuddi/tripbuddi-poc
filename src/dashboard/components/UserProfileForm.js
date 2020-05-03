import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import useInputState from '../hooks/useInputState';
import AvatarEditor from './AvatarEditor';
import { useHistory, useLocation } from 'react-router-dom';

import Auth from '@aws-amplify/auth';
import UserProfileService from '../services/UserProfileService';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  profileAvatar: {
    width: '150px',
    height: '150px',
  },
  overlay: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    color: 'white',
    borderRadius: '50%',
    backgroundColor: '#0c0c0c78',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  editAvatarButton: {
    color: 'white',
  },
}));

export default function UserProfileForm() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [preferredName, setPreferredName, handlePreferredNameChange] = useInputState('');
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarOriginalUrl, setAvatarOriginalUrl] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showEditAvatarOverlay, setShowEditAvatarOverlay] = useState(false);
  const currentAuthenticatedUser = useRef(null);
  const currentUserProfile = useRef(null);

  useEffect(() => {
    const initialLoad = async () => {
      currentAuthenticatedUser.current = await Auth.currentAuthenticatedUser();
      currentUserProfile.current = await UserProfileService.getCurrentUserProfile();
      if (currentUserProfile.current) {
        setPreferredName(currentUserProfile.current.preferredName);
        setAvatar(currentUserProfile.current.avatar);
        setAvatarOriginalUrl(currentUserProfile.current.avatarOriginalUrl);
      }
    };
    initialLoad();
  }, [currentUserProfile]);

  const uploadFile = async (file) => {
    setLoading(true);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'profiles');
    data.append('public_id', `/${currentAuthenticatedUser.current.username}/profile-${new Date().getTime()}`);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dljpdnsjo/image/upload`, {
        method: 'POST',
        body: data,
      });
      const responseJson = await response.json();
      setAvatarOriginalUrl(responseJson.secure_url);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setLoading(true);

    if (!preferredName) {
      return;
    }

    try {
      const updatedProfile = {
        username: currentAuthenticatedUser.current.username,
        preferredName,
        avatar,
        avatarOriginalUrl,
        isComplete: true,
      };
      const id = !!currentUserProfile.current ? currentUserProfile.current.id : null;
      await UserProfileService.saveUserProfile(id, updatedProfile);
      setLoading(false);

      let { from } = location.state || { from: { pathname: '/' } };
      if (from === '/profile') {
        from = '/';
      }
      history.replace(from);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleSharpIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          User Profile
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile();
          }}>
          <TextField variant='outlined' margin='normal' required fullWidth label='Preferred Name' name='preferredName' autoComplete='preferredName' autoFocus value={preferredName} onChange={handlePreferredNameChange} disabled={loading} />
          <Box display='flex' alignItems='center' justifyContent='center'>
            {showPicker && (
              <AvatarEditor
                width={390}
                height={295}
                onCrop={(preview) => {
                  setAvatar(preview);
                }}
                onClose={() => {
                  setAvatar(null);
                  setAvatarOriginalUrl(null);
                }}
                onBeforeFileLoad={(elem) => {}}
                onFileLoad={uploadFile}
                src={avatarOriginalUrl}
              />
            )}
            {!showPicker && (
              <Box
                position='relative'
                onMouseEnter={() => {
                  setShowEditAvatarOverlay(true);
                }}
                onMouseLeave={() => {
                  setShowEditAvatarOverlay(false);
                }}
                display='inline'
                onClick={() => setShowPicker(true)}>
                <Avatar className={classes.profileAvatar} src={avatar}>
                  {!showEditAvatarOverlay &&
                    preferredName
                      .split(' ')
                      .map((nameSplit) => {
                        return nameSplit.charAt(0).toUpperCase();
                      })
                      .join('')}
                </Avatar>
                {showEditAvatarOverlay && (
                  <div className={classes.overlay}>
                    <Button className={classes.editAvatarButton}>Edit</Button>
                  </div>
                )}
              </Box>
            )}
          </Box>
          <Button type='submit' fullWidth variant='outlined' size='large' color='primary' id='submit' className={classes.submit} disabled={loading}>
            Update and continue
          </Button>
          {loading && (
            <Box mb={2}>
              <LinearProgress />
            </Box>
          )}
          {/* {key && <S3Image level='public' imgKey={key} />} */}
        </form>
      </div>
    </Container>
  );
}
