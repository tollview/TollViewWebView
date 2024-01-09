import React from "react";
import "../styles/DayReport.css";
import {Gate} from "../models/Gate.ts";

interface DayReportModalLineProps {
    tollData: any;
    gateMap: Record<string, Gate>;
}

const DayReportModalLine: React.FC<DayReportModalLineProps> = ({ tollData, gateMap }) => {
    console.log(`tollData: ${JSON.stringify(tollData)}`);
    console.log(`gateMap: ${JSON.stringify(gateMap)}`);

    const formatTime = (timestamp: any): string => {
        return new Date(timestamp.year, timestamp.month - 1, timestamp.date, timestamp.hours, timestamp.minutes)
            .toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
    };

    const tollDataLine: string = `${formatTime(tollData.timestamp)} - [name] - [cost]`;


    return (
        <div>
            <p>{tollDataLine}</p>
        </div>
    );
};

export default DayReportModalLine;
