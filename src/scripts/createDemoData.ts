import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const generateRandomEmail = () => {
    const tollWords = ["Fee", "Fare", "Charge", "Payment", "Tariff", "Levy", "Dues", "Tax", "Turnstile", "Tithe", "Custom", "Rate", "Price"];
    const viewWords = ["Sight", "Scene", "Vista", "Watcher", "Observer", "Survey", "Vantage", "Perspective", "Summary", "Report", "Picture"];
    const tollWord = tollWords[Math.floor(Math.random() * tollWords.length)];
    const viewWord = viewWords[Math.floor(Math.random() * viewWords.length)];
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return `${tollWord}_${viewWord}${randomNumber}@fakemail.com`;
};

export const handleDemoData = async () => {

    const email: string = generateRandomEmail();
    const password: string = "123456";
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
};
