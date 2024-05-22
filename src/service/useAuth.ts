"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "./firebase.connection";

const auth = getAuth(app);
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return {user};
};
export {useAuth, auth};
