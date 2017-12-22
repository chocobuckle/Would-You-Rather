const AUTHENTICATING = 'AUTHENTICATING';
const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
const UNAUTH_USER_SUCCESS = 'UNAUTH_USER_SUCCESS';

const initialState = {
  isAuthed: false,
  authedID: '',
  authenticating: false
};

export const authenticating = () => ({
  type: AUTHENTICATING,
  authenticating: true
});

export const authUserSuccess = (uid) => ({
  type: AUTH_USER_SUCCESS,
  isAuthed: true,
  authedID: uid,
  authenticating: false
});

export const unAuthUserSuccess = () => ({
  type: UNAUTH_USER_SUCCESS,
  ...initialState
});

export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        authenticating: action.authenticating
      };
    case AUTH_USER_SUCCESS:
    case UNAUTH_USER_SUCCESS:
      return {
        ...state,
        isAuthed: action.isAuthed,
        authedID: action.authedID,
        authenticating: action.authenticating
      };
    default:
      return state;
  }
}
