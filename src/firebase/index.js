import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

//  Collections
export const usersCollection = collection(db, "liveUsers");
export const ordersCollection = collection(db, "liveOrders");
export const transactionsCollection = collection(db, "liveTransactions");
export const storesCollection = collection(db, "liveStores");

//  Counters
export const usersCounter = doc(db, "liveCounters", "users");
export const ordersCounters = doc(db, "liveCounters", "orders");
