import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBYcdaOC9wDZjeldT_PELq-4eGcKcHfbcE",
  authDomain: "andrei-ecommerce.firebaseapp.com",
  databaseURL: "https://andrei-ecommerce.firebaseio.com",
  projectId: "andrei-ecommerce",
  storageBucket: "andrei-ecommerce.appspot.com",
  messagingSenderId: "946101353923",
  appId: "1:946101353923:web:80f56c848704ec1a345176",
  measurementId: "G-DXZJ61D4VG",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
