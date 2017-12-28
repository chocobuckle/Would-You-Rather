import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDdHmKE76KxNlwxHX8j0Grp7XGPplB6mzQ',
  authDomain: 'would-you-rather-b7254.firebaseapp.com',
  databaseURL: 'https://would-you-rather-b7254.firebaseio.com',
  projectId: 'would-you-rather-b7254',
  storageBucket: 'would-you-rather-b7254.appspot.com',
  messagingSenderId: '430846264719'
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
