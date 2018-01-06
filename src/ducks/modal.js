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
  return {
    type: OPEN_MODAL
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const updateDecisionText = (whichDecision, text) => ({
  type: UPDATE_DECISION,
  whichDecision,
  text
});

export function saveAndCloseModal(decision) {
  return (dispatch) => {
    saveDecision(decision)
      .then(dispatch(closeModal()))
      .catch((error) => {
        throw new Error(`Error saving decision: ${error}`);
      });
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
        [action.whichDecision]: action.text
      };
    default:
      return state;
  }
}
