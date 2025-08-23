import {db} from '../config/firebase';
import {doc, updateDoc} from 'firebase/firestore';

export const updateUser = async (uid, updatedData) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, updatedData)
        return {success: true, msg: 'updated succesfully'};
    } catch (error) {
        console.log('error updating user: ', error);
        return {success: false, msg: error?.message}
        
    }
}