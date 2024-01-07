import React from "react";
import "../styles/DayReport.css"

interface DayReportModalProps {
    onClose: () => void;
}

const DayReportModal: React.FC<DayReportModalProps> = ({ onClose }) => {
    return (
        <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
        <span className="close" onClick={(e) => onClose(e)}>
          &times;
        </span>
                <p>Hello World! This is your additional information.</p>
            </div>
        </div>
    );
};

export default DayReportModal;
