import auth, { logout, saveUser } from 'helpers/auth';
import formatUserInfo from 'helpers/utils';

const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const UNAUTH_USER_SUCCESS = 'UNAUTH_USER_SUCCESS';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';
const REMOVE_FETCHING = 'REMOVE_FETCHING';

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

export const unAuthUserSuccess = () => ({
  type: UNAUTH_USER_SUCCESS
});

const fetchingUser = () => ({
  type: FETCHING_USER
});

const fetchingUserFailure = (error) => ({
  type: FETCHING_USER_FAILURE,
  error
});

export const fetchingUserSuccess = (uid, user, timestamp) => ({
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp
});

export const removeFetching = () => ({
  type: REMOVE_FETCHING
});

export function fetchAndHandleAuthedUser() {
  return function (dispatch) {
    dispatch(fetchingUser());
    return auth()
      .then(({ user }) => {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid);
        return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()));
      })
      .then(({ user }) => saveUser(user))
      .then((user) => dispatch(authUserSuccess(user.uid)))
      .catch((error) => dispatch(fetchingUserFailure(error)));
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
        isFetching: false,
        authedID: action.authedID
      };
    case UNAUTH_USER_SUCCESS:
      return initialState;
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
    case REMOVE_FETCHING:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}
