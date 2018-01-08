const ADD_LISTENER = 'ADD_LISTENER';

export function addListener(listenerID) {
  return {
    type: ADD_LISTENER,
    listenerID
  };
}

export default function listeners(state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenerID]: true
      };
    default:
      return state;
  }
}
