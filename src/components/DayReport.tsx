import { child, ref, remove } from "firebase/database";
import React, {useEffect, useState} from "react";
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

// IF YOU CHANGE THIS NAME IT WILL ALL BREAK. DO NOT DO.
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

    const handleModalOpen = () => {
        if (!showModal) {
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const day: string = thisDayArrayOfTolls[0];
    const tollsArrayForDay: any[] = thisDayArrayOfTolls[1];

    // Summing up the costs for the day
    const totalCost: number = tollsArrayForDay.reduce((sum: number, toll: any) => {
        const gate = gatesMap[toll.gateId];
        if (gate) {
            sum += gate.cost;
        }
        return sum;
    }, 0);

    const cost: string = formatCurrency(totalCost);


    const handleDelete = () => {
        tollsArrayForDay.forEach((toll: Toll) => {
            const deletionIndex: number = Number(toll["key"]);
            const deletionTarget = child(dbRefAtUserTolls, `${deletionIndex}`);
            remove(deletionTarget).catch((error) =>
                console.error(`Error deleting ${deletionTarget}: ${error}`)
            );
        });
        onRefresh();
    };

    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && showModal) {
                handleModalClose();
            }
        };

        // Add event listener to the entire document for the Escape key
        document.addEventListener("keydown", handleEscapeKey);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [showModal]);

    return (
        <div className="dayReportLineItem" onClick={() => {
            handleModalOpen();
        }}
        >
            <h2>{day}</h2>
            <h2>{cost}</h2>
            <button onClick={handleDelete}>
        <span role="img" aria-label="Trash Can">
          🗑️
        </span>
            </button>

            {/* Modal */}
            {showModal && <DayReportModal onClose={handleModalClose} />}
        </div>
    );
};

export default DayReport;
