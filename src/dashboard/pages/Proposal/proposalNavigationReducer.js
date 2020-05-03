import produce from 'immer';

const proposalNavigationReducer = (draft, action) => {
  const { type } = action;
  switch (type) {
    case 'toggleMessageSection':
      draft.isMessageSectionOpen = !draft.isMessageSectionOpen;
      break;
    case 'closeMessageSection':
      draft.isMessageSectionOpen = false;
      break;
    case 'openMessageSection':
      draft.isMessageSectionOpen = true;
      break;
    case 'toggleIsMiniVideoCall':
      draft.isMiniVideoCall = !draft.isMiniVideoCall;
      break;
    default:
      break;
  }
  return draft;
};

export const initialNavigationState = { isMessageSectionOpen: true, isMiniVideoCall: false };

export default produce(proposalNavigationReducer);
