// Your web app's Firebase configuration
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/app";
import "firebase/database";
import "firebase/functions";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "hire-ez.firebaseapp.com",
  databaseURL: "https://hire-ez.firebaseio.com",
  projectId: "hire-ez",
  storageBucket: "hire-ez.appspot.com",
  messagingSenderId: "282012845396",
  appId: "1:282012845396:web:7b83b74843fde5a93d34c1"
};
// Initialize Firebase
// let fire = firebase.initializeApp(firebaseConfig);

const getFirebase = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase;
};

export default getFirebase