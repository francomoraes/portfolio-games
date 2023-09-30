import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// authentification with google account

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const name = result.user.displayName;
            const email = result.user.email;
            const photo = result.user.photoURL;

            localStorage.setItem(
                'user',
                JSON.stringify({
                    name: name,
                    email: email,
                    photo: photo
                })
            );
        })
        .catch((error) => {
            console.log(error);
        });
};
