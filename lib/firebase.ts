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

// Google Sign In
const googleProvider = new GoogleAuthProvider();
async function signInWithGoogle() {
  try {
    const res = await signInWithRedirect(auth, googleProvider);
  } catch (e) {
    alert('Error signing in with Google \n Please try again');
  }
};

// Demo user Sign In
async function SignInDemoUser() {
  try {
    await signInWithEmailAndPassword(auth, "demouser@demo.com", "demouser123");
  } catch (e) {
    alert('Error signing in with Demo User \n Please try again');
  }
}

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

export { auth, db, signInWithGoogle, SignInDemoUser, saveJob, delJob, saveNote, delNote };