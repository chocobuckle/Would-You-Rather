import { addListener } from 'ducks/listeners';
// import { addUser } from 'ducks/users';
import { listenToDecisions, fetchSingleDecision } from 'helpers/api';

const SETTING_DECISIONS_LISTENER = 'SETTING_DECISIONS_LISTENER';
const SETTING_DECISIONS_LISTENER_ERROR = 'SETTING_DECISIONS_LISTENER_ERROR';
const SETTING_DECISIONS_LISTENER_SUCCESS = 'SETTING_DECISIONS_LISTENER_SUCCjjjESS';
const ADD_DECISION = 'ADD_DECISION';

const initialState = {
  lastUpdated: 0,
  isFetching: false,
  error: '',
  decisions: {}
};

const settingDecisionsListener = () => ({
  type: SETTING_DECISIONS_LISTENER
});

const settingDecisionsListenerError = (error) => ({
  type: SETTING_DECISIONS_LISTENER_ERROR,
  error
});

const settingDecisionsListenerSuccess = (decisions) => ({
  type: SETTING_DECISIONS_LISTENER_SUCCESS,
  timestamp: Date.now(),
  decisions
});

export function setAndHandleDecisionsListener() {
  return function (dispatch, getState) {
    if (getState().listeners.decisions === true) return;
    dispatch(addListener('decisions'));
    dispatch(settingDecisionsListener());
    listenToDecisions((decisions) => {
      dispatch(settingDecisionsListenerSuccess(decisions));
      // Object.keys(decisions).map((decisionId) => {
      //   dispatch(addUser(decisions[decisionId].author)));
      // }
    }, (error) => dispatch(settingDecisionsListenerError(error)));
  };
}

function addDecision(decisionId, decision) {
  return {
    type: ADD_DECISION,
    decisionId,
    decision
  };
}

export function fetchAndHandleSingleDecision(decisionId) {
  return function (dispatch) {
    fetchSingleDecision(decisionId)
      .then((decision) => dispatch(addDecision(decisionId, decision)))
      .catch((error) => console.warn('Error fetching decision', error));
  };
}

export default function decisions(state = initialState, action) {
  switch (action.type) {
    case SETTING_DECISIONS_LISTENER:
      return {
        ...state,
        isFetching: true
      };
    case SETTING_DECISIONS_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case SETTING_DECISIONS_LISTENER_SUCCESS:
      return {
        ...state,
        lastUpdated: action.timestamp || state.lastUpdated,
        isFetching: false,
        decisions: {
          ...state.decisions,
          ...action.decisions
        }
      };
    case ADD_DECISION:
      return {
        ...state,
        isFetching: false,
        decisions: {
          ...state.decisions,
          [action.decisionId]: action.decision
        }
      };
    default:
      return state;
  }
}
