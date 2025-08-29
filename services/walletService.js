import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const createOrUpdateWallet = async (walletData) => {
  try {
    const walletToSave = { ...walletData };

    // Якщо id немає → створюємо новий гаманець
    if (!walletData?.id) {
      walletToSave.amount = 0;
      walletToSave.totalIncome = 0;
      walletToSave.totalExpense = 0;
      walletToSave.created = new Date();
    }

    // Якщо id є → оновлюємо документ, інакше створюємо новий
    const walletRef = walletData?.id
      ? doc(db, "wallets", walletData.id)
      : doc(collection(db, "wallets"));

    await setDoc(walletRef, walletToSave, { merge: true });

    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error) {
    console.log("error", error);
    return { success: false, msg: error.message };
  }
};

export const deleteWallet = async (walletId) => {
  try {
    const walletRef = doc(db, "wallets", walletId);
    await deleteDoc(walletRef);

    return { success: true };
  } catch (err) {
    console.log("deleteWallet error:", err);
    return { success: false, msg: err.message };
  }
};
