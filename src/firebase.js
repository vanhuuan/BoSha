import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOqHFg4SCK5RlnNXtbvECxI72lEtqPoFc",
  authDomain: "bosha-4df95.firebaseapp.com",
  projectId: "bosha-4df95",
  storageBucket: "bosha-4df95.appspot.com",
  messagingSenderId: "859009091797",
  appId: "1:859009091797:web:750f69de15ea41461aba5c",
  measurementId: "G-376FMDC1Y8"
};

var app = firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.database_url,
  storageBucket: firebaseConfig.storageBucket
});

app.auth().signInWithCustomToken(localStorage.getItem("FirebaseToken"))
  .then(function () {
    
  })
  .catch(function (error) {
  });

export const storage = getStorage(app);