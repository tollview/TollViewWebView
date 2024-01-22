import { getAuth, signOut } from "firebase/auth";

export const handleSignOut = async function () {
    const auth = getAuth();

    try {
        if (auth.currentUser) {
            await signOut(auth);
        } else {
            console.log("No user to sign out");
        }
    } catch (error) {
        console.error(`Error signing out: ${error}`);
    }
};
