import { saveDecision } from 'helpers/api';
import { ref } from 'config/constants';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
const UPDATE_DECISION_TEXT = 'UPDATE_DECISION_TEXT';

const initialState = {
  modalOpen: false,
  title: '',
  firstDecisionText: '',
  secondDecisionText: ''
};

export const openModal = () => ({
  type: OPEN_MODAL
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const updateDecisionText = (whichDecision, newText) => ({
  type: UPDATE_DECISION_TEXT,
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
        modalOpen: true
      };
    case CLOSE_MODAL:
      return initialState;
    case UPDATE_DECISION_TEXT:
      return {
        ...state,
        [action.whichDecision]: action.newText
      };
    default:
      return state;
  }
}
