import { ref, firebaseAuth } from 'config/constants';

export default function auth() {
  console.log('authenticating!');
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider());
}

export function logout() {
  return firebaseAuth().signOut();
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}/info`)
    .set(user)
    .then(() => user);
}
