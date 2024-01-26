import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { getDatabase, ref, set} from "firebase/database";
const generateRandomEmail = () => {
    const tollWords = ["Charge", "Dues", "Fare", "Fee", "Levy", "Payment", "Price", "Rate", "Tariff", "Tax", "Tithe", "Turnstile"];
    const viewWords = ["Observer", "Perspective", "Picture", "Report", "Scene", "Sight", "Summary", "Survey", "Vantage", "Vista", "Watcher"];
    const tollWord = tollWords[Math.floor(Math.random() * tollWords.length)];
    const viewWord = viewWords[Math.floor(Math.random() * viewWords.length)];
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return `${tollWord}_${viewWord}${randomNumber}@fakemail.com`;
};

export const handleDemoUserCreation = async () => {
    const email: string = generateRandomEmail();
    const password: string = "123456";
    const auth = getAuth();
    const db = getDatabase();

    await createUserWithEmailAndPassword(auth, email, password);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const preferencesRef = ref(db, 'users/' + user.uid + '/preferences');
            set(preferencesRef, { isDemo: true });
        }
    });
};
