import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';


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

// Google Sign In
const googleProvider = new GoogleAuthProvider();
async function signInWithGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

// Demo user Sign In
async function SignInDemoUser() {
  try {
    await signInWithEmailAndPassword(auth, "demouser@demo.com", "demouser123");
    // handle successful login
  } catch (error) {
    // handle login error
  }
}

export { auth, signInWithGoogle, SignInDemoUser };