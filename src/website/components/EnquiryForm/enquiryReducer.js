import produce from 'immer';

const enquiryReducer = (draft, action) => {
  const { type, payload } = action;
  const { field, errorCode } = payload || {};
  const { travelTo, travelDate, tripLength, travellers, fieldErrors } = draft;
  const emptyfieldErrors = {
    travelTo: '',
    travelDate: '',
    tripLength: '',
    travellers: '',
    budget: '',
  };

  switch (type) {
    case 'fieldErrors':
      if (travelTo.length === 0) {
        emptyfieldErrors.email = 'You need to let us know where you want to go';
      }
      draft.fieldErrors = emptyfieldErrors;
      draft.loading = false;
      draft.hasError = false;
      draft.error = '';
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
  travelTo: '',
  travelDate: '',
  tripLength: '',
  travellers: '',
  budget: '',
  loading: false,
  hasError: false,
  error: '',
  fieldErrors: {
    travelTo: '',
    travelDate: '',
    tripLength: '',
    travellers: '',
    budget: '',
  },
};

export default produce(enquiryReducer);
