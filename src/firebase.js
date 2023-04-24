import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';







export const auth= firebase.initializeApp ({
    apiKey: "AIzaSyCmVa4qi3gkotWDQg5s7KRsHzcAKggcsoQ",
    authDomain: "unichat-e42d4.firebaseapp.com",
    projectId: "unichat-e42d4",
    storageBucket: "unichat-e42d4.appspot.com",
    messagingSenderId: "349424923307",
    appId: "1:349424923307:web:29b34f10fcb9225a8d3dee"
  }).auth();

