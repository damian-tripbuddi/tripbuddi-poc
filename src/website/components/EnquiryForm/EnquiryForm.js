import React, { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import useStyles from './EnquiryForm.styles';
import enquiryReducer, { initialState } from './enquiryReducer';

export default function LoginForm(props) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(enquiryReducer, initialState);
  const { travelTo, travelDate, tripLength, travellers, budget, loading, hasError, error, fieldErrors } = state;
  const handleFieldChange = (e) => {
    dispatch({ type: 'updateField', payload: { field: e.target } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth='xs' className={classes.container}>
      <Box>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Box mb={0}>
            <TextField size='small' margin='normal' required fullWidth label='Where are you travelling to?' name='travelTo' autoFocus value={travelTo} onChange={handleFieldChange} disabled={loading} error={!!fieldErrors.travelTo} helperText={fieldErrors.travelTo || null} />
          </Box>
          <Box mb={0}>
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              label='Approximately when are you travelling?'
              name='travelDate'
              value={travelDate}
              onChange={handleFieldChange}
              disabled={loading}
              error={!!fieldErrors.travelDate}
              helperText={fieldErrors.travelDate || null}
            />
          </Box>
          <Box mb={0}>
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              label='Approximately how long is your holiday?'
              name='tripLength'
              value={tripLength}
              onChange={handleFieldChange}
              disabled={loading}
              error={!!fieldErrors.tripLength}
              helperText={fieldErrors.tripLength || null}
            />
          </Box>
          <Box mb={0}>
            <TextField
              size='small'
              margin='normal'
              required
              fullWidth
              label='How many adults/children are travelling?'
              name='travellers'
              value={travellers}
              onChange={handleFieldChange}
              disabled={loading}
              error={!!fieldErrors.travellers}
              helperText={fieldErrors.travellers || null}
            />
          </Box>
          <Box mb={0}>
            <TextField size='small' margin='normal' required fullWidth label='What is your budget?' name='budget' value={budget} onChange={handleFieldChange} disabled={loading} error={!!fieldErrors.budget} helperText={fieldErrors.budget || null} />
          </Box>
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
          <Box mt={3} mb={3}>
            <Button type='submit' fullWidth variant='contained' size='large' color='primary' id='submit' disabled={loading}>
              Connect with a Travel Expert now
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
