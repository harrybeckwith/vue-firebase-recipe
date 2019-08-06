import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var config = {
  apiKey: 'AIzaSyDe-dBwpfIyzCEDH4sUGVWHmGNMWcuC-Gc',
  authDomain: 'vue-smoothies-91bc9.firebaseapp.com',
  databaseURL: 'https://vue-smoothies-91bc9.firebaseio.com',
  projectId: 'vue-smoothies-91bc9',
  storageBucket: 'vue-smoothies-91bc9.appspot.com',
  messagingSenderId: '904109806092',
  appId: '1:904109806092:web:806b1bb71bb1758a',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

// export firestore database
export default firebaseApp.firestore();
