import React from "react";
import "../styles/DayReport.css";
import { Gate } from "../models/Gate.ts";

interface DayReportModalLineProps {
    tollData: any; // Adjust the type accordingly
    gateMap: Record<string, Gate>;
}

const DayReportModalLine: React.FC<DayReportModalLineProps> = ({ tollData, gateMap }) => {
    // Customize the rendering of a single line based on the provided data
    // Example: <div>{tollData.someProperty}</div>
    return (
        <div>
            <p>{tollData.key}</p>
        </div>
    );
};

export default DayReportModalLine;
