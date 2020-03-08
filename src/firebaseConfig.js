import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyA_OSfiTXh5e4Jj2ctJtn0Pu6bIkORDxsQ",
    authDomain: "moviechat-240e5.firebaseapp.com",
    databaseURL: "https://moviechat-240e5.firebaseio.com",
    projectId: "moviechat-240e5",
    storageBucket: "moviechat-240e5.appspot.com",
    messagingSenderId: "981629435123",
    appId: "1:981629435123:web:f5b305a052801b052b0b86",
    measurementId: "G-THG0THWT0V"
  };
  
  

    
  firebase.initializeApp(config);


  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;
