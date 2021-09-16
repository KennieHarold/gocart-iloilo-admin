import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

//  DB
export const usersDb = "liveUsers";
export const ordersDb = "liveOrders";
export const transactionsDb = "liveTransactions";
export const storesDb = "liveStores";

//  Collections
export const usersCollection = collection(db, usersDb);
export const ordersCollection = collection(db, ordersDb);
export const transactionsCollection = collection(db, transactionsDb);
export const storesCollection = collection(db, storesDb);

//  Counters
export const usersCounter = doc(db, "liveCounters", "users");
export const ordersCounters = doc(db, "liveCounters", "orders");
