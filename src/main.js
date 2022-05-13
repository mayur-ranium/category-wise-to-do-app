import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import App from './App.vue'
import router from "./Router/index"
import { getFirestore } from "firebase/firestore";
import '@fortawesome/fontawesome-free/js/all.js';
import './style.css';
import store from './store'


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
  
  onAuthStateChanged(auth, (user) => {
    store.dispatch("fetchUser", user);

  })

const db = getFirestore(firebase);
const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');
