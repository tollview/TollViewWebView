import {useState} from "react";
import {handleSignIn} from "../scripts/signIn.ts";
import {User} from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const handleUserSignIn = async () => {
        const userData = await handleSignIn(email, password);
        setUser(userData);
    };
    return (
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

            <p>
                {
                    user ? (
                        <>
                            <p>Welcome, {user.email}!</p>
                        </>
                    ) : (
                        <p>user not loaded</p>
                    )
                }
            </p>
        </form>
    );

}

export default Login;