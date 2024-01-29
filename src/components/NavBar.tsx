import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import { User } from "firebase/auth";
import UserPreferencesModal from "./UserPreferencesModal";
import { ref, get } from "firebase/database";
import { useFirebase } from "../contexts/FirebaseContext.tsx";

interface NavBarProps {
    user: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
    const [showUserPreferencesModal, setShowUserPreferencesModal] = useState(false);
    const [name, setName] = useState<string | null>(null);
    const { db } = useFirebase();

    useEffect(() => {
        const fetchNameFromDatabase = async () => {
            if (user) {
                const preferencesRef = ref(db, `users/${user.uid}/preferences/name`);
                try {
                    const snapshot = await get(preferencesRef);
                    if (snapshot.exists()) {
                        setName(snapshot.val());
                    }
                } catch (error) {
                    console.error("Error fetching name value from the database", error);
                }
            }
        };

        fetchNameFromDatabase();
    }, [db, user]);

    const handleUserPreferencesClick = () => {
        setShowUserPreferencesModal(true);
    };

    const handleUserPreferencesModalClose = () => {
        setShowUserPreferencesModal(false);
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
    };

    return (
        <div className="NavBar">
            {user ? (
                <>
                    <p onClick={handleUserPreferencesClick}>
                        Welcome, {name ? name : user.email}
                    </p>
                    {showUserPreferencesModal && (
                        <UserPreferencesModal
                            onClose={handleUserPreferencesModalClose}
                            onNameChange={handleNameChange}
                        />
                    )}
                </>
            ) : (
                <p>Welcome to TollView WebView.</p>
            )}
        </div>
    );
};

export default NavBar;
