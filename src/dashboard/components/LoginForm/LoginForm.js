import React, { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory, useLocation } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

import Auth from '@aws-amplify/auth';

import useStyles from './LoginForm.styles';

import loginReducer, { initialState } from './loginReducer';

import { ReactComponent as TripBuddiLogo } from '../../../common/svg/TripBuddiLogo.svg';

export default function LoginForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { email, password, loading, hasError, error, fieldErrors } = state;

  const handleFieldChange = (e) => {
    dispatch({ type: 'updateField', payload: { field: e.target } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      dispatch({ type: 'fieldErrors' });
    } else {
      try {
        dispatch({ type: 'attemptLogin' });
        await Auth.signIn(email, password);
        dispatch({ type: 'loginSuccessful' });
        const { from } = location.state || { from: { pathname: '/' } };

        if (from.pathname === '/logout') {
          history.replace('/');
        } else {
          history.replace(from);
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: 'loginError', payload: { errorCode: err.code } });
      }
    }
  };

  return (
    <Container component='main' maxWidth='xs' className={classes.container}>
      <Box display='flex' height='100%' flexDirection='column' alignItems='center' justifyContent='center'>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField variant='outlined' margin='normal' required fullWidth id='email' label='Email' name='email' autoComplete='email' autoFocus value={email} onChange={handleFieldChange} disabled={loading} error={!!fieldErrors.email} helperText={fieldErrors.email || null} />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={handleFieldChange}
            disabled={loading}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password || null}
          />
          {loading && (
            <Box my={2}>
              <LinearProgress />
            </Box>
          )}
          {hasError && (
            <Box my={1}>
              <Alert severity='error'>
                <AlertTitle>Sign Error</AlertTitle>
                {error}
              </Alert>
            </Box>
          )}
          <Box mt={2} mb={3}>
            <Button type='submit' fullWidth variant='outlined' size='large' color='primary' id='submit' disabled={loading}>
              Sign In
            </Button>
          </Box>
          {!loading && (
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
          )}
        </form>
      </Box>
    </Container>
  );
}
