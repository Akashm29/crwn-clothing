import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCRRLM4yfLxhY9nC7PBkCSQlLp6aNYCbI",
  authDomain: "crwn-clothing-db-5af57.firebaseapp.com",
  projectId: "crwn-clothing-db-5af57",
  storageBucket: "crwn-clothing-db-5af57.appspot.com",
  messagingSenderId: "236110151228",
  appId: "1:236110151228:web:da7554f0a3fb5fc91d4d39",
  measurementId: "G-RRTHW5PV3M"
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })

    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}