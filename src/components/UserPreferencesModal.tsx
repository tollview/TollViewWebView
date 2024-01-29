import React, { useEffect } from "react";
import "../styles/pages/DayReport.css";
import "../styles/pages/UserPreferences.css"

interface UserPreferencesModalProps {
    onClose: () => void;
}

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({ onClose }) => {
    useEffect(() => {
        return () => {
        };
    }, []);

    return (
        <div className="modal preferencesModal" style={{display: "block"}}>
            <div className="modal-content">
                <span className="close" onClick={() => onClose()}>
                    &times;
                </span>
                <h1>User Preferences</h1>
            </div>
        </div>
    );
};

export default UserPreferencesModal;
