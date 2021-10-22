import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const env = process.env.REACT_APP_ENVIRONMENT;
console.log(process.env.REACT_APP_ENVIRONMENT);

export const firebaseApp = initializeApp(firebaseConfig);

//  Builds
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

//  DB
export const usersDb = env === "production" ? "liveUsers" : "devUsers";
export const ordersDb = env === "production" ? "liveOrders" : "devOrders";
export const transactionsDb =
  env === "production" ? "liveTransactions" : "devTransactions";
export const storesDb = env === "production" ? "liveStores" : "devStores";
export const productsDb = env === "production" ? "liveProducts" : "devProducts";

//  Collections
export const usersCollection = collection(db, usersDb);
export const ordersCollection = collection(db, ordersDb);
export const transactionsCollection = collection(db, transactionsDb);
export const storesCollection = collection(db, storesDb);

//  Counters
const counters = env === "production" ? "liveCounters" : "devCounters";

export const usersCounter = doc(db, counters, "users");
export const ordersCounter = doc(db, counters, "orders");
export const storesCounter = doc(db, counters, "stores");
