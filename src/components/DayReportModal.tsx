import React from "react";
import "../styles/DayReport.css";
import { Gate } from "../models/Gate.ts";
import DayReportModalLine from "./DayReportModalLine.tsx";

interface DayReportModalProps {
    thisDayArrayOfTolls: [string, any];
    gatesMap: Record<string, Gate>;
    onClose: () => void;
    cost: string;
}

const DayReportModal: React.FC<DayReportModalProps> = ({ onClose, thisDayArrayOfTolls, gatesMap, cost }) => {
    const dateHeaderDisplay: string = new Date(thisDayArrayOfTolls[1][0].timestamp.year, thisDayArrayOfTolls[1][0].timestamp.month - 1, thisDayArrayOfTolls[1][0].timestamp.date)
        .toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });


    return (
        <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
                <span className="close" onClick={(e) => onClose(e)}>
                    &times;
                </span>
                <h1>{dateHeaderDisplay}</h1>
                {thisDayArrayOfTolls[1].map((tollData: any, index: number) => (
                    <DayReportModalLine key={index} tollData={tollData} gateMap={gatesMap} />
                ))}
                <h1>{cost}</h1>
            </div>
        </div>
    );
};

export default DayReportModal;
