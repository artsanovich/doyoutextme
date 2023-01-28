import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyBwV2jdLoRy4stsb4sMo1a1Zqo__6CqUGc",
  authDomain: "doyoutextme.firebaseapp.com",
  projectId: "doyoutextme",
  storageBucket: "doyoutextme.appspot.com",
  messagingSenderId: "703946248607",
  appId: "1:703946248607:web:e79ff4d91be924449badaa",
  measurementId: "G-82VTGNQL5Q"
});

export const Context = createContext(null)

const auth = firebase.auth();
const firestore = firebase.firestore();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
);
