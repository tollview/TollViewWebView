import React from "react";
import { Gate } from "../models/Gate.ts";
import { ref, remove } from "firebase/database";
import {useFirebase} from "../contexts/FirebaseContext.tsx";
import {useUser} from "../contexts/UserContext.tsx";
import "../styles/pages/DayReport.css";

interface DayReportModalLineProps {
    tollData: any;
    gateMap: Record<string, Gate>;
    onRefresh: () => void;
}
const DayReportModalLine: React.FC<DayReportModalLineProps> = ({ tollData, gateMap, onRefresh }) => {
    const { db } = useFirebase();
    const { user } = useUser();
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
        // Delete the specific toll
        const deletionIndex: number = Number(tollData.key);
        const deletionTarget = ref(db, `users/${user?.uid}/tolls/${deletionIndex}`);
        remove(deletionTarget)
            .then(() => {
                onRefresh();
            })
            .catch((error) => {
                console.error(`Error deleting toll with key ${tollData.key}: ${error}`);
            });
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{marginRight: "8px", marginLeft: "8px"}}>{tollDataLine}</p>
            <button onClick={handleDelete} style={{background: "none", border: "none", cursor: "pointer", marginRight: "8px"}}>
                <span className="deletion-icon" role="img" aria-label="Trash Can">
                    🗑️
                </span>
            </button>
        </div>
    );
};

export default DayReportModalLine;
