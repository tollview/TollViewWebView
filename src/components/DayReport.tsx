import { child, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../contexts/FirebaseContext.tsx";
import { useUser } from "../contexts/UserContext.tsx";
import { Gate } from "../models/Gate.ts";
import { Toll } from "../models/Toll.ts";
import "../styles/DayReport.css";
import DayReportModal from "./DayReportModal";

interface DayReportProps {
    thisDayArrayOfTolls: [string, any];
    gatesMap: Record<string, Gate>;
    onRefresh: () => void;
}

const DayReport: React.FC<DayReportProps> = ({ thisDayArrayOfTolls, gatesMap, onRefresh }) => {
    const { db } = useFirebase();
    const { user } = useUser();
    const dbRefAtUserTolls = ref(db, `users/${user?.uid}/tolls/`);
    const formatCurrency = (value: number) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleModalOpen = () => {
        if (!showModal) {
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop the click event from propagating to the parent div
        setShowConfirmation(true);
    };

    const handleNo = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop the click event from propagating to the parent div
        setShowConfirmation(false);
    };

    const handleYes = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop the click event from propagating to the parent div
        tollsArrayForDay.forEach((toll: Toll) => {
            const deletionIndex: number = Number(toll["key"]);
            const deletionTarget = child(dbRefAtUserTolls, `${deletionIndex}`);
            remove(deletionTarget).catch((error) =>
                console.error(`Error deleting ${deletionTarget}: ${error}`)
            );
        });
        onRefresh();
        setShowConfirmation(false); // Close the confirmation dialog if needed
    };

    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if ((e.key === "Escape" || e.key === "Esc") && (showModal || showConfirmation)) {
                handleModalClose();
                setShowConfirmation(false); // Close the confirmation dialog if needed
            }
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [showModal, showConfirmation]);

    const day: string = thisDayArrayOfTolls[0];
    const tollsArrayForDay: any[] = thisDayArrayOfTolls[1];

    const totalCost: number = tollsArrayForDay.reduce((sum: number, toll: any) => {
        const gate = gatesMap[toll.gateId];
        if (gate) {
            sum += gate.cost;
        }
        return sum;
    }, 0);

    const cost: string = formatCurrency(totalCost);

    return (
        <div className="dayReportLineItem" onClick={handleModalOpen}>
            <h2>{day}</h2>
            <h2>{cost}</h2>
            <button onClick={(e) => handleDelete(e)} style={{background: "none", border: "none", cursor: "pointer"}}>
              <span role="img" aria-label="Trash Can">
                🗑️
              </span>
            </button>

            {showConfirmation && (
                <div className="confirmation-dialog-card">
                    <p>Are you sure you want to delete an entire day's record of tolls?</p>
                    <button onClick={(e) => handleYes(e)}>Yes</button>
                    <button onClick={(e) => handleNo(e)}>No</button>
                </div>
            )}

            {showModal && (
                <DayReportModal
                    onClose={handleModalClose}
                    thisDayArrayOfTolls={thisDayArrayOfTolls}
                    gatesMap={gatesMap}
                    cost={cost}
                />
            )}
        </div>
    );
};

export default DayReport;
