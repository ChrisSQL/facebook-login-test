import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyCHRLOibxIQtzGaZ7Pi4SFaxFyOqp0H7oU",
    authDomain: "onthesesh.ie",
    databaseURL: "https://tnteventsapp.firebaseio.com/",
    storageBucket: "tnteventsapp.appspot.com",
    messagingSenderId: "37018668289"
};
var fire = firebase.initializeApp(config);
export default fire;
