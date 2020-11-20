import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function useDoc(path) {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    db.doc(path).onSnapshot((doc) => {
      setDoc({
        ...doc.data(),
        id: doc.id,
      });
    });
  }, [path]);
  return doc;
}
