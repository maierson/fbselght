import { useEffect, useState } from "react";
import { doc, getDoc } from "./firebase-client";
import { useFirestore } from "./use-firestore";

async function getDocument<T>(
  firestore,
  path: string,
  id: string,
): Promise<T | null> {
  const docSnap = await getDoc(doc(firestore, path, id));
  if (docSnap.exists()) {
    return docSnap.data() as T;
  }
  return null;
}

interface Result<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useGetFirestoreDoc<T>(path: string, id?: string): Result<T> {
  const [document, setDocument] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (path && id) {
      setLoading(true);
      getDocument<T | null>(firestore, path, id)
        .then((result) => {
          setDocument(result);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDocument(null);
    }
  }, [path, id, firestore]);

  return { data: document, loading, error };
}
