import { ref, firebaseAuth } from 'config/constants';

export default function auth() {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider());
}

export function logout() {
  return firebaseAuth().signOut();
}

export function checkIfAuthed(store) {
  return store.getState().users.isAuthed;
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}/info`)
    .set(user)
    .then(() => user);
}
