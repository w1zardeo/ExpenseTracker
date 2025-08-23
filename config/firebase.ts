import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD7go7wrhVU8i_eJ0IpozeVhIUQUxHqb0E",
  authDomain: "expense-tracker-76481.firebaseapp.com",
  databaseURL: "https://expense-tracker-76481-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-76481",
  storageBucket: "expense-tracker-76481.appspot.com",
  messagingSenderId: "376032966226",
  appId: "1:376032966226:web:956563d90e68da4573118b"
};

const app = initializeApp(firebaseConfig);

// Ініціалізація auth для RN
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

// config/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyD7go7wrhVU8i_eJ0IpozeVhIUQUxHqb0E",
//   authDomain: "expense-tracker-76481.firebaseapp.com",
//   databaseURL: "https://expense-tracker-76481-default-rtdb.firebaseio.com",
//   projectId: "expense-tracker-76481",
//   storageBucket: "expense-tracker-76481.appspot.com",
//   messagingSenderId: "376032966226",
//   appId: "1:376032966226:web:956563d90e68da4573118b"
// };

// // Ініціалізація Firebase
// const app = initializeApp(firebaseConfig);

// // Auth і Firestore
// export const auth = getAuth(app);
// export const db = getFirestore(app);
