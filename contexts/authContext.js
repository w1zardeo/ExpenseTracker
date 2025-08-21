// import { auth, db } from "../config/firebase";
// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword 
// } from "firebase/auth";
// import { 
//   doc, 
//   setDoc, 
//   getDoc 
// } from "firebase/firestore";
// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       return { success: true };
//     } catch (error) {
//       return { success: false, msg: error.message };
//     }
//   };

//   const register = async (email, password, name) => {
//     try {
//       let response = await createUserWithEmailAndPassword(auth, email, password);
//       await setDoc(doc(db, "users", response.user.uid), {
//         name,
//         email,
//         uid: response.user.uid,
//       });
//       return { success: true };
//     } catch (error) {
//       return { success: false, msg: error.message };
//     }
//   };
  

//   const updateUserData = async (uid) => {
//     try {
//       const docRef = doc(db, "users", uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         setUser({
//           uid: data?.uid,
//           email: data?.email || null,
//           name: data?.name || null,
//           image: data?.image || null,
//         });
//       }
//     } catch (error) {
//       console.log("error:", error.message);
//     }
//   };

//   const contextValue = {
//     user,
//     setUser,
//     login,
//     register,
//     updateUserData,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be wrapped inside AuthProvider");
//   }
//   return context;
// };

// export default AuthProvider;


import { auth, db } from "../config/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser({
          uid: data?.uid,
          email: data?.email || null,
          name: data?.name || null,
          image: data?.image || null,
        });
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const login = async (email, password) => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      await updateUserData(res.user.uid); // ✅ після логіну вантажимо дані
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  const register = async (email, password, name) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response.user.uid), {
        name,
        email,
        uid: response.user.uid,
        image: null, // можеш сюди задати дефолтний аватар
      });
      await updateUserData(response.user.uid); // ✅ одразу зберігаємо в state
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
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
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped inside AuthProvider");
  }
  return context;
};

export default AuthProvider;
