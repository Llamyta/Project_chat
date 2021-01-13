import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage'
// import 'firebase/auth';
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
// } from 'react-native-dotenv';

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDIUMlncmjs0vqo3SfC9rlWRLzuVTd4W-I",
  authDomain: "pdmhito.firebaseapp.com",
  databaseURL: "https://pdmhito.firebaseio.com",
  projectId: "pdmhito",
  storageBucket: "pdmhito.appspot.com",
  messagingSenderId: "561905216797",
  appId: "1:561905216797:web:613c3ab5c812dd0fd505f4"
};
export const firebaseApp=firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);

// export const storage=firebase.storage();
// export const firestore = firebase.firestore();
// export default firebase;
