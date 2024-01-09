import React from "react";
import "../styles/DayReport.css";
import {Gate} from "../models/Gate.ts";

interface DayReportModalProps {
    thisDayArrayOfTolls: [string, any];
    gatesMap: Record<string, Gate>;
    onClose: () => void;
}

const DayReportModal: React.FC<DayReportModalProps> = ({ onClose, thisDayArrayOfTolls, gatesMap }) => {
    return (
        <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
                <span className="close" onClick={(e) => onClose(e)}>
                    &times;
                </span>
                <p style={{color: "black"}}>{JSON.stringify(thisDayArrayOfTolls)}</p>
                <p style={{color: "black"}}>{JSON.stringify(gatesMap)}</p>
            </div>
        </div>
    );
};

export default DayReportModal;
