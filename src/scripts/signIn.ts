import { app } from "./firebaseConfig.ts"
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { getDatabase, ref, child, get } from 'firebase/database';

export const handleSignIn = async (email: string, password: string): Promise<User | null> => {
    const auth = getAuth(app);
    let user: User | null = null 

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;

        const db = getDatabase(app);
        const dbRef = ref(db);

        const snapshot = await get(child(dbRef, 'users'));
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.log(error)
    }

    return user
};