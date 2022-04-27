import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import App from './App.vue'
import router from "./Router/index"
import { getFirestore } from "firebase/firestore";

import './style.css'


const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL:import.meta.env.VITE_DATABASE_URL,
  projectId:import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_API_ID
  };

  
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
 
  console.log(auth);

const app = createApp(App);
app.use(router);


app.mount('#app');
