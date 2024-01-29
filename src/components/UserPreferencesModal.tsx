import React, { useEffect, useState } from "react";
import { get, ref, DataSnapshot, set } from "firebase/database";
import { useUser } from "../contexts/UserContext";
import { useFirebase } from "../contexts/FirebaseContext.tsx";
import "../styles/pages/DayReport.css";
import "../styles/pages/UserPreferences.css";

interface UserPreferencesModalProps {
    onClose: () => void;
    onNameChange: (newName: string) => void;
}

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({ onClose, onNameChange }) => {
    const { user } = useUser();
    const { db } = useFirebase();
    const [email, setEmail] = useState<string>(user?.email || "");
    const [demoAccount, setDemoAccount] = useState<string>("Unknown");
    const [name, setName] = useState<string>(" ");

    useEffect(() => {
        if (user) {
            const isDemoRef = ref(db, `users/${user.uid}/preferences/isDemo`);
            const nameRef = ref(db, `users/${user.uid}/preferences/name`);

            get(isDemoRef)
                .then((snapshot: DataSnapshot) => {
                    if (snapshot.exists() && (snapshot.val() === true || snapshot.val() === false)) {
                        setDemoAccount(snapshot.val() ? "Yes" : "No");
                    } else {
                        console.error("Invalid value for isDemo in the database");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching isDemo value from the database", error);
                });

            get(nameRef)
                .then((snapshot: DataSnapshot) => {
                    if (snapshot.exists() && snapshot.val() !== null) {
                        setName(snapshot.val());
                    } else {
                        console.log("Name value not found in the database or is null");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching name value from the database", error);
                });
        }
    }, [db, user]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            const preferencesRef = ref(db, `users/${user.uid}/preferences/name`);
            set(preferencesRef, e.target.value)
                .then(() => {
                    console.log("Name updated successfully");
                    onNameChange(e.target.value);
                })
                .catch((error) => {
                    console.error("Error updating name value in the database", error);
                });
        }

        setName(e.target.value);
    };

    return (
        <div className="modal preferencesModal" style={{ display: "block" }}>
            <div className="modal-content">
                <span className="close" onClick={() => onClose()}>
                    &times;
                </span>
                <h1>User Preferences</h1>
                <div className="field">
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        readOnly
                        className="preferenceField readOnly"
                    />
                </div>
                <div className="field">
                    <label>Demo Account: </label>
                    <select
                        value={demoAccount}
                        disabled
                        className="preferenceField"
                    >
                        <option value="Unknown">Unknown</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                <div className="field">
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="preferenceField"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserPreferencesModal;
