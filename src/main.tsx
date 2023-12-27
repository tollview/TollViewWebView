import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { handleSignIn } from "./scripts/signIn.ts"
import { User } from "firebase/auth";

function AppWrapper() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);

    // Handle the sign-in process
    const handleUserSignIn = async () => {
        const userData = await handleSignIn(email, password);
        setUser(userData);
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
                <button onClick={handleUserSignIn}>Sign In</button>
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

