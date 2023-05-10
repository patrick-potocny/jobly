import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { DocumentData, addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { JobType } from "./types";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuD1q7p9oNlBYMY1jzo2KcPHMCNZmr8uA",
  authDomain: "jobly-97d1b.firebaseapp.com",
  projectId: "jobly-97d1b",
  storageBucket: "jobly-97d1b.appspot.com",
  messagingSenderId: "599380859116",
  appId: "1:599380859116:web:57200538379700260dedc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

type ErrorMessages = {
  [key: string]: string;
};

const errorMessages: ErrorMessages = {
  'auth/user-disabled': 'Your account has been disabled.',
  'auth/user-not-found': 'User not found. Please check your email and try again.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  "auth/weak-password": 'Your password is too weak. Please use stronger one.',
  "auth/email-already-in-use": 'The email address is already in use by another account.',
  'auth/network-request-failed': 'A network error occurred. Please try again later.',
  "auth/popup-closed-by-user": 'Popup has been closed by the user. Please try again.',
  "auth/popup-blocked": 'Popup has been blocked by the browser. Please try again.',
  // Add more error codes and messages as needed
};

function getErrorMessage(errorCode: string | undefined) {
  if (errorCode) return errorCode in errorMessages ? errorMessages[errorCode] : 'An error occurred. Please try again later.';
};


// Save job to db
async function saveJob(jobData: JobType | DocumentData, jobId: string | undefined, userEmail: string | undefined | null) {
  if (jobId && userEmail) {
    try {
      await setDoc(doc(db, `users/${userEmail}/jobs`, jobId), jobData);
    } catch (e) {
      console.log(e);
    }
  } else if (userEmail) {
    try {
      await addDoc(collection(db, `users/${userEmail}/jobs`), jobData);
    } catch (e) {
      console.log(e);
    }
  }
}

// Delete job from db
async function delJob(jobId: string, userEmail: string | undefined | null) {
  if (userEmail) {
    try {
      await deleteDoc(doc(db, `users/${userEmail}/jobs`, jobId));
    } catch (e) {
      console.log(e);
    }
  }
}

// Save note to db
async function saveNote(note: JobType | DocumentData, noteId: string | undefined, userEmail: string | undefined | null) {
  console.log(note, noteId, userEmail)
  if (noteId && userEmail) {
    try {
      await setDoc(doc(db, `users/${userEmail}/notes`, noteId), note);
    } catch (e) {
      console.log(e);
    }
  } else if (userEmail) {
    try {
      await addDoc(collection(db, `users/${userEmail}/notes`), note);
    } catch (e) {
      console.log(e);
    }
  }
}

// Delete job from db
async function delNote(noteID: string, userEmail: string | undefined | null) {
  if (userEmail) {
    try {
      await deleteDoc(doc(db, `users/${userEmail}/notes`, noteID));
    } catch (e) {
      console.log(e);
    }
  }
}

export { auth, db, saveJob, delJob, saveNote, delNote, getErrorMessage };