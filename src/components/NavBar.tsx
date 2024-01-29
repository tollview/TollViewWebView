import React from "react";
import "../styles/NavBar.css";
import {User} from "firebase/auth";

interface NavBarProps {
    user: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
    return (
        <div className="NavBar">
            {user ? <p>Welcome, {user.email}</p> : <p>No user logged in</p>}
        </div>
    );
};

export default NavBar;