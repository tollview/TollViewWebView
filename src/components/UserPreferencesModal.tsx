import React, { useEffect, useState } from "react";
import { get, ref, DataSnapshot } from "firebase/database";
import { useUser } from "../contexts/UserContext";
import { useFirebase } from "../contexts/FirebaseContext.tsx";
import "../styles/pages/DayReport.css";
import "../styles/pages/UserPreferences.css";

interface UserPreferencesModalProps {
    onClose: () => void;
}

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({ onClose }) => {
    const { user } = useUser();
    const { db } = useFirebase();
    const [email, setEmail] = useState<string>(user?.email || "");
    const [demoAccount, setDemoAccount] = useState<string>("Unknown");

    useEffect(() => {
        if (user) {
            // Construct the path to the preferences node in the database
            const preferencesRef = ref(db, `users/${user.uid}/preferences/isDemo`);

            // Retrieve the isDemo value from the preferences node
            get(preferencesRef)
                .then((snapshot: DataSnapshot) => {
                    // Check if the value exists and is either true or false
                    if (snapshot.exists() && (snapshot.val() === true || snapshot.val() === false)) {
                        setDemoAccount(snapshot.val() ? "Yes" : "No");
                    } else {
                        // Handle the case where the value is not present or not a valid boolean
                        console.error("Invalid value for isDemo in the database");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching isDemo value from the database", error);
                });
        }
    }, [db, user]);

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
            </div>
        </div>
    );
};

export default UserPreferencesModal;
