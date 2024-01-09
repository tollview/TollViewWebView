import React from "react";
import { Gate } from "../models/Gate.ts";

interface DayReportModalLineProps {
    tollData: any; // Adjust the type accordingly
    gateMap: Record<string, Gate>;
}
const DayReportModalLine: React.FC<DayReportModalLineProps> = ({ tollData, gateMap }) => {
    const formatTime = (timestamp: any): string => {
        return new Date(timestamp.year, timestamp.month - 1, timestamp.date, timestamp.hours, timestamp.minutes)
            .toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
    };

    const gateId = tollData.gateId;
    const gateInfo = gateMap[gateId];
    const gateName = gateInfo ? gateInfo.name : "[name]";
    const gateCost = gateInfo ? gateInfo.cost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    }) : "[cost]";

    const tollDataLine: string = `${formatTime(tollData.timestamp)} - ${gateName} - ${gateCost}\u00A0\u00A0`;

    const handleDelete = () => {
        console.log(`Let's delete ${tollData.key}`);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{marginRight: "8px", marginLeft: "8px"}}>{tollDataLine}</p>
            <button onClick={handleDelete} style={{background: "none", border: "none", cursor: "pointer", marginRight: "8px"}}>
                <span role="img" aria-label="Trash Can">
                    🗑️
                </span>
            </button>
        </div>
    );
};

export default DayReportModalLine;
