import { saveDecision } from 'helpers/api';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const UPDATE_DECISION = 'UPDATE_DECISION';

const initialState = {
  modalIsOpen: false,
  title: '',
  firstDecision: '',
  secondDecision: ''
};

export const openModal = () => {
  console.log('Open modal request sent!');
  return {
    type: OPEN_MODAL
  };
};

export const closeModal = () => {
  console.log('Close modal request sent!');
  return {
    type: CLOSE_MODAL
  };
};

export const updateDecisionText = (whichDecision, newText) => ({
  type: UPDATE_DECISION,
  whichDecision,
  newText
});

export function saveAndCloseModal(decision) {
  return (dispatch) => {
    saveDecision(decision)
      .then(dispatch(closeModal()))
      .catch((error) => console.warn(`Error saving decision: ${error}`));
  };
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true
      };
    case CLOSE_MODAL:
      return initialState;
    case UPDATE_DECISION:
      return {
        ...state,
        [action.whichDecision]: action.newText
      };
    default:
      return state;
  }
}
