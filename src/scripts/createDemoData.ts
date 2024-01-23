import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const handleDemoData = async () => {
    console.log("gonna handle demo data")
    const email: string = "hi@hi.com"
    const password: string = "123456"
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
}