import { Firestore } from "firebase/firestore";
import { firestore } from "./firebase-client";

export function useFirestore(): Firestore {
  return firestore;
}
