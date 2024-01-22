import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext.tsx';
import { handleSignIn } from "../scripts/signIn.ts";
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (authUser) => {
            setUser(authUser);
        });

        return () => unsubscribe();
    }, [setUser]);

    const handleUserSignIn = async () => {
        const userData = await handleSignIn(email, password);
        setUser(userData);
        if (userData) {
            navigate('/');
        }
    };

    const handleDownload = () => {
        const downloadUrl = '/assets/apks/TollViewPreAlpha_0_0_0.apk';
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'TollViewPreAlpha_0_0_0.apk';
        link.click();
    };

    return (
        <div>
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <button onClick={(e) => {
                    e.preventDefault();
                    handleUserSignIn();
                }}>Sign In
                </button>

                {user ? <p>Welcome, {user.email}!</p> : <p>User not loaded</p>}
            </form>
            <button onClick={handleDownload}>Download TollView APK</button>
        </div>
    );
}

export default Login;
