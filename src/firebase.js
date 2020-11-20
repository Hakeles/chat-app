import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiixEgw1NP9aVXFFo6pLeum8ODj37IPis",
  authDomain: "chat-webapp-aeaf9.firebaseapp.com",
  databaseURL: "https://chat-webapp-aeaf9.firebaseio.com",
  projectId: "chat-webapp-aeaf9",
  storageBucket: "chat-webapp-aeaf9.appspot.com",
  messagingSenderId: "664801003579",
  appId: "1:664801003579:web:7a4a27ee62a2ad5c1b741e",
  measurementId: "G-0PQX3Z374G",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };
