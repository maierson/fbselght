/* eslint-disable @typescript-eslint/no-explicit-any */

import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification as sendVerification,
  sendPasswordResetEmail as sendReset,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { AuthUser } from './auth-user';
export * from 'firebase/firestore';

const config = process.env.NEXT_PUBLIC_APP_ID
  ? {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    }
  : // the firebase-config file is copied to the base of the project
    // before each of the apps is launched so this should always be
    // updated according to the app that is currently running.
    // see setup in package.json start scripts.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../firebase-config').firebaseConfig;

// const USE_EMULATOR = true;
const apps = getApps();
const firebaseApp: FirebaseApp =
  apps && apps.length > 0 ? apps[0] : initializeApp(config);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp, config.storageBucket);
export const functions = getFunctions(firebaseApp);

setLogLevel('debug');

// auth
export async function registerFirebase(
  name: string,
  email: string,
  password: string
): Promise<void | User> {
  const credential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (!credential) {
    return;
  }

  const { user } = credential;

  if (!name) {
    return user;
  }

  return await updateProfile(user, { displayName: name });
}

export function loginFirebase(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutFirebase() {
  return signOut(auth);
}

export function sendPasswordResetEmail(email: string, options) {
  return sendReset(auth, email, options);
}

export function sendEmailVerification(user: AuthUser) {
  return sendVerification(user);
}
