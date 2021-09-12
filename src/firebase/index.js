import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

//  Collections
export const usersCollection = collection(db, "liveUsers");
export const ordersCollection = collection(db, "liveOrders");
