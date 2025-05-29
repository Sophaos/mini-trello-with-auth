import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "@/error/error-handler";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        handleError(error);
        toast.error(`An error occurred: ${error.message}`);
        throw error;
      });
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleError(error);
      toast.error(`An error occurred: ${error.message}`);
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
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

  const authValue = {
    signUp,
    login,
    logout,
    loading,
    user,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
