import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import axiosPublic from "../hooks/useAxiosPublic";
import { showAlert } from "../utils";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserFunction = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileFunction = async (profileInfo) => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, {
      displayName: profileInfo.displayName,
      photoURL: profileInfo.photoURL,
    });

    await auth.currentUser.reload();
    const updated = auth.currentUser;
    setUser({ ...updated });
  };

  const loginFunction = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginPopFunction = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutFunction = async () => {
    setLoading(true);
    try {
      await axiosPublic.post("/auth/logout");
      await signOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
      showAlert({
        color: "lime",
        icon: "success",
        title: "Logged out successfully!",
      });
    }
  };

  const authInfo = {
    user,
    setUser,
    createUserFunction,
    loginFunction,
    loginPopFunction,
    logoutFunction,
    updateProfileFunction,
    loading,
    setLoading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
