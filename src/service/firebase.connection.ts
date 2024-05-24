import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCYj6qg3_1fC79ud8G-XdswXRYdyruf46A",
  authDomain: "energybillreader.firebaseapp.com",
  projectId: "energybillreader",
  storageBucket: "energybillreader.appspot.com",
  messagingSenderId: "630944778941",
  appId: "1:630944778941:web:3c3d86a9f675dda2c785d4",
};

export const app = initializeApp(firebaseConfig);
