import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyCm-l8Os6PK9OzSytq18r2NpH_zxHcXLKY',
    authDomain: 'tollview-dfw.firebaseapp.com',
    databaseURL: 'https://tollview-dfw-default-rtdb.firebaseio.com',
    projectId: 'tollview-dfw',
    storageBucket: 'tollview-dfw.appspot.com',
    messagingSenderId: '536066125827',
    appId: '1:536066125827:web:2098e3502eaad2501f9e36',
    measurementId: 'G-F5S51QK4L1',
};

function AppWrapper() {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);

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
    };

    return (
        <React.StrictMode>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={handleSignIn}>Sign In</button>
            </div>
            {user ? (
                <>
                    <p>Welcome, {user.email}!</p>
                    <App />
                </>
            ) : (
                <p>user not loaded</p>
            )}
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<AppWrapper />);

