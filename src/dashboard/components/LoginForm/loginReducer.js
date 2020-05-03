import produce from 'immer';

const loginReducer = (draft, action) => {
  const { type, payload } = action;
  const { field, errorCode } = payload || {};
  const { email, password, fieldErrors } = draft;
  const emptyfieldErrors = {
    email: '',
    password: '',
  };

  switch (type) {
    case 'attemptLogin':
      draft.loading = true;
      draft.hasError = false;
      draft.error = '';
      draft.fieldErrors = {
        email: '',
        password: '',
      };
      break;
    case 'fieldErrors':
      if (email.length === 0) {
        emptyfieldErrors.email = 'You must provide an email to Sign in';
      }
      if (password.length === 0) {
        emptyfieldErrors.password = 'Your must provide a password to Sign in';
      }
      draft.fieldErrors = emptyfieldErrors;
      draft.loading = false;
      draft.hasError = false;
      draft.error = '';
      break;
    case 'loginSuccesful':
      draft.loading = false;
      draft.hasError = false;
      draft.error = '';
      draft.isLoggedIn = true;
      break;
    case 'loginError':
      draft.email = '';
      draft.password = '';
      draft.loading = false;
      draft.hasError = true;
      draft.error = errorCodeMappings[errorCode] || 'Incorrect username or password. Please try again.';
      draft.isLoggedIn = false;
      break;
    case 'updateField':
      if (field.value.length !== 0) fieldErrors[field.name] = '';
      draft[field.name] = field.value;
      draft.fieldErrors = fieldErrors;
      draft.hasError = false;
      draft.error = '';
      break;
    case 'resetField':
      draft[field.name] = '';
      break;
    default:
      break;
  }
  return draft;
};

export const initialState = {
  email: '',
  password: '',
  isLogged: false,
  loading: false,
  hasError: false,
  error: '',
  fieldErrors: {
    email: '',
    password: '',
  },
};

const errorCodeMappings = {
  UserNotConfirmedException: 'This account requires email confirmaion. Please check your email to verify your account.',
  PasswordResetRequiredException: 'Your password needs to be reset. Please click on the forgot password link to reset your password.',
  NotAuthorizedException: 'Incorrect username or password. Please try again.',
  UserNotFoundException: 'The username is not found. Please click on the Sign up link to create an account.',
};

export default produce(loginReducer);
