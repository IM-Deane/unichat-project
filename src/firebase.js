import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyChke3drPr6XD-xnThIniXTNqrFHlXNqiY",
  authDomain: "memories-app-317021.firebaseapp.com",
  projectId: "memories-app-317021",
  storageBucket: "memories-app-317021.appspot.com",
  messagingSenderId: "961955129519",
  appId: "1:961955129519:web:a8eb04f290e563b4268c5a"
}).auth();