// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCRRLM4yfLxhY9nC7PBkCSQlLp6aNYCbI",
  authDomain: "crwn-clothing-db-5af57.firebaseapp.com",
  projectId: "crwn-clothing-db-5af57",
  storageBucket: "crwn-clothing-db-5af57.appspot.com",
  messagingSenderId: "236110151228",
  appId: "1:236110151228:web:da7554f0a3fb5fc91d4d39",
  measurementId: "G-RRTHW5PV3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initlize provider
const provider = new GoogleAuthProvider();
// set custom params (like prompt : "select_account")
provider.setCustomParameters({
    prompt: 'select_account'
})
// getAuth from firebase
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db,'users',userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data exists
  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      })
    }
    catch(error){
      console.log("error creating user",error.message)
    }


  }
  return userDocRef;


  //else create user data in collection
}