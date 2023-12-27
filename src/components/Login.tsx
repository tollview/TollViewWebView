import {useState} from "react";
import {handleSignIn} from "../scripts/signIn.ts";
import {User} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    
    const handleUserSignIn = async () => {
        const userData = await handleSignIn(email, password);
        setUser(userData);
        if (userData) {
            navigate('/'); 
        }
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
            }}>Sign In</button>

            {user ? <p>Welcome, {user.email}!</p> : <p>User not loaded</p>}
        </form>
    );

}

export default Login;