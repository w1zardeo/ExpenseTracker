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


// import { auth, db } from "../config/firebase";
// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword, 
//   onAuthStateChanged
// } from "firebase/auth";
// import { 
//   doc, 
//   setDoc, 
//   getDoc 
// } from "firebase/firestore";
// import { createContext, useState, useContext, useEffect } from "react";
// import { navigate, replace } from "../services/navigationService";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         setUser({
//           uid: firebaseUser?.uid,
//           email: firebaseUser?.email,
//           name: firebaseUser?.displayName,
//         });
//         replace("Tabs");   // ✅ тепер без useNavigation
//       } else {
//         setUser(null);
//         replace("Welcome"); // ✅ працює навіть поза екраном
//       }
//     });

//     return () => unsub();
//   }, []);

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

//   const login = async (email, password) => {
//     try {
//       let res = await signInWithEmailAndPassword(auth, email, password);
//       await updateUserData(res.user.uid);
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
//         image: null,
//       });
//       await updateUserData(response.user.uid);
//       return { success: true };
//     } catch (error) {
//       return { success: false, msg: error.message };
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
  createUserWithEmailAndPassword, 
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { replace } from "../services/navigationService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser({
          uid: data?.uid,
          email: data?.email || "",
          name: data?.name || "",
          image: data?.image || null,
        });
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await updateUserData(firebaseUser.uid);
        replace("Tabs");
      } else {
        setUser(null);
        replace("Welcome");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      await updateUserData(res.user.uid);
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
        image: null,
      });
      await updateUserData(response.user.uid);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  const contextValue = {
    user,
    loading,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be wrapped inside AuthProvider");
  return context;
};

export default AuthProvider;
