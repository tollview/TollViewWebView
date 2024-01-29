import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext.tsx';
import { handleSignIn } from "../scripts/signIn.ts";
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import {handleDemoUserCreation} from "../scripts/createDemoUser.ts";
import NavBar from "../components/NavBar.tsx";
import "../styles/pages/Login.css"

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

    const handleNewDemo = async () => {
        await handleDemoUserCreation();
        const auth = getAuth();
        const signInPromise = new Promise<void>((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
                if (authUser) {
                    await handleSignIn(authUser.email, '123456');
                    unsubscribe();
                    resolve();
                }
            });
        });
        await signInPromise;
        navigate('/');
    }

    useEffect(() => {
        if (user) {
            console.log(`Welcome, ${user.email}!`);
        } else {
            console.log('User not loaded');
        }
    }, [user]);

    return (
        <>
            <NavBar user={user}/>
            <br/><br/>
            <div className="loginContainer">
                <div className={'loginSection'}>
                    <form>
                        <input type="email" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                        <input type="password" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <br/>
                        <button className={'pageNavButton'} onClick={(e) => {
                            e.preventDefault();
                            handleUserSignIn();
                        }}>Sign In
                        </button>
                    </form>
                    <button className={'pageNavButton'} onClick={handleNewDemo}>Demo with Sample Data</button>
                </div>
            </div>
            <button className={'pageNavButton bottomRightButton'} onClick={handleDownload}>Download TollView APK
            </button>
        </>
    );

}

export default Login;
