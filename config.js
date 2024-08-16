import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyB0Bi0VabGNriqMhC2tWHJRMNScJbc8eE8",
    authDomain: "blogging-app-p7.firebaseapp.com",
    projectId: "blogging-app-p7",
    storageBucket: "blogging-app-p7.appspot.com",
    messagingSenderId: "774814207856",
    appId: "1:774814207856:web:1171430ef564215b2689b5"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { collection, doc, addDoc, getDocs, query, where, orderBy };