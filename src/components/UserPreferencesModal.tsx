import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import "../styles/pages/DayReport.css";
import "../styles/pages/UserPreferences.css";

interface UserPreferencesModalProps {
    onClose: () => void;
}

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({ onClose }) => {
    const { user } = useUser();
    const [email, setEmail] = useState<string>(user?.email || "");

    useEffect(() => {
        // Additional setup or side effects can go here
        // This effect runs once when the component mounts
        return () => {
            // Cleanup or additional actions on component unmount
        };
    }, []);

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
            </div>
        </div>
    );
};

export default UserPreferencesModal;
