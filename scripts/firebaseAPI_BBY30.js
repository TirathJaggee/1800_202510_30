//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyAQnoa44KElqVnv2qHPDe7xd2z5lnrFuXo",
    authDomain: "team30-project-127c3.firebaseapp.com",
    projectId: "team30-project-127c3",
    storageBucket: "team30-project-127c3.firebasestorage.app",
    messagingSenderId: "175518642365",
    appId: "1:175518642365:web:eb4c1be54177a599b707d4"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();