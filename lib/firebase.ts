import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


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
    const res = await signInWithPopup(auth, googleProvider);
  } catch (e) {
    alert('Error signing in with Google \n Please try again');
  }
};

// Demo user Sign In
async function SignInDemoUser() {
  try {
    await signInWithEmailAndPassword(auth, "demouser@demo.com", "demouser123");
    // handle successful login
  } catch (e) {
    alert('Error signing in with Demo User \n Please try again');
  }
}

export { auth, db, signInWithGoogle, SignInDemoUser };