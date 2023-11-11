import { initializeApp } from "firebase/app";
import { doc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dbRef = doc(db, "Data", "Passwords");
const authRef = doc(db, "Credentials", "Auth");
const dynamic_authRef = (id: string) => doc(db, "Credentials", id);

export { db, authRef, dbRef, dynamic_authRef };
