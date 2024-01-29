import React, { useState } from "react";
import "../styles/NavBar.css";
import { User } from "firebase/auth";
import UserPreferencesModal from "./UserPreferencesModal";

interface NavBarProps {
    user: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
    const [showUserPreferencesModal, setShowUserPreferencesModal] = useState(false);

    const handleUserPreferencesClick = () => {
        setShowUserPreferencesModal(true);
    };

    const handleUserPreferencesModalClose = () => {
        setShowUserPreferencesModal(false);
    };

    return (
        <div className="NavBar">
            {user ? (
                <>
                    <p onClick={handleUserPreferencesClick}>Welcome, {user.email}</p>
                    {showUserPreferencesModal && (
                        <UserPreferencesModal onClose={handleUserPreferencesModalClose} />
                    )}
                </>
            ) : (
                <p>Welcome to TollView WebView.</p>
            )}
        </div>
    );
};

export default NavBar;
