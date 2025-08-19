import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch {
      error;
    }
    {
      let msg = error.message;
      return { success: false, msg };
    }
  };

  const register = async (email, password, name) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid,
      });
      return { success: true };
    } catch {
      error;
    }
    {
      let msg = error.message;
      return { success: false, msg };
    }
  };

  const updateUserData = async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await docSnap(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData = {
          uid: data?.uid,
          email: data?.email || null,
          name: data?.name || null,
          image: data?.image || null,
        };
        setUser({ ...userData });
      }
    } catch {
      error;
    }
    {
      let msg = error.message;
      //   return { success: false, msg };
      console.log("error:", error);
    }
  };
  const contextValue = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must ne wrapped inside AuthProvider')
    }
    return context;
}
