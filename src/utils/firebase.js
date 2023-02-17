import {
  doc,
  onSnapshot,
  getFirestore,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage"


const FireBaseInit = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pyro-intuit.firebaseapp.com",
  databaseURL: "https://pyro-intuit.firebaseio.com",
  projectId: "pyro-intuit",
  storageBucket: "pyro-intuit.appspot.com",
  messagingSenderId: "657829873421",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = initializeApp(FireBaseInit)
const auth = getAuth()
const db = getFirestore(app)
const provider = new GoogleAuthProvider()


export {
  db,
  doc,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
  updateDoc,
  addDoc,
  onSnapshot,
  auth,
  signInWithPopup,
  provider,
  GoogleAuthProvider,
  Timestamp,
  onAuthStateChanged,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  deleteDoc
}
