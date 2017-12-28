import auth, { logout, saveUser } from 'helpers/auth';

const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const UNAUTH_USER_SUCCESS = 'UNAUTH_USER_SUCCESS';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';

const initialState = {
  isAuthed: false,
  authedID: '',
  isFetching: false
};

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: ''
  },
  decisionsMade: {}
};

const authUserSuccess = (uid) => ({
  type: AUTH_USER_SUCCESS,
  authedID: uid
});

const unAuthUserSuccess = () => ({
  type: UNAUTH_USER_SUCCESS
});

const fetchingUser = () => ({
  type: FETCHING_USER
});

const fetchingUserFailure = (error) => ({
  type: FETCHING_USER_FAILURE,
  error
});

const fetchingUserSuccess = (uid, user, timestamp) => ({
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp
});

export function fetchAndHandleAuthedUser() {
  return function (dispatch) {
    dispatch(fetchingUser());
    auth().then((data) => console.log(data));
  };
}

function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      };
    default:
      return state;
  }
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        isAuthed: true,
        authedID: action.authedID
      };
    case UNAUTH_USER_SUCCESS:
      return {
        ...state,
        ...initialState
      };
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          error: '',
          isFetching: false
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action)
        };
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
