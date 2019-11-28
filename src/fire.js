// Your web app's Firebase configuration
import firebase from 'firebase'
require('dotenv').config()

let APIKEY = process.env.APIKEY

var firebaseConfig = {
  apiKey: APIKEY ,
  authDomain: "hire-ez.firebaseapp.com",
  databaseURL: "https://hire-ez.firebaseio.com",
  projectId: "hire-ez",
  storageBucket: "hire-ez.appspot.com",
  messagingSenderId: "282012845396",
  appId: "1:282012845396:web:7b83b74843fde5a93d34c1"
};
// Initialize Firebase
let fire = firebase.initializeApp(firebaseConfig);

export default fire