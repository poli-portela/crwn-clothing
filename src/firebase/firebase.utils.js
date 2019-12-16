import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAARujsEEoHm35Rovd5tP22JngKxsQKf8Q",
    authDomain: "crwn-db-5aba7.firebaseapp.com",
    databaseURL: "https://crwn-db-5aba7.firebaseio.com",
    projectId: "crwn-db-5aba7",
    storageBucket: "crwn-db-5aba7.appspot.com",
    messagingSenderId: "230691281179",
    appId: "1:230691281179:web:15e4459f8a6a47e08f1bbe",
    measurementId: "G-JKN9JYBCM5"
  };
  
export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const sanpShot = await userRef.get();
    if (!sanpShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;

};
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
