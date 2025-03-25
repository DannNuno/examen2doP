

import { initializeApp } from "firebase/app";


export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDREeeRuuIndpA1b8KsncQvIzf8IfVrbvM",
    authDomain: "exp2-9a9d2.firebaseapp.com",
    projectId: "exp2-9a9d2",
    storageBucket: "exp2-9a9d2.firebasestorage.app",
    messagingSenderId: "403583816709",
    appId: "1:403583816709:web:7fa8ccaf63cff367ef786c"
  },
};

const app = initializeApp(environment.firebaseConfig);
