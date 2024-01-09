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

    const tollDataLine: string = `${formatTime(tollData.timestamp)} - ${gateName} - ${gateCost}`;

    return (
        <div>
            <p>{tollDataLine}</p>
        </div>
    );
};

export default DayReportModalLine;
