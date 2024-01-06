import { child, ref, remove } from "firebase/database";
import React from "react";
import { useFirebase } from "../contexts/FirebaseContext.tsx";
import { useUser } from "../contexts/UserContext.tsx";
import { Gate } from "../models/Gate.ts";
import { Toll } from "../models/Toll.ts";
import "../styles/DayReport.css"


interface DayReportProps {
    thisDayArrayOfTolls: [string, any];
    gatesMap: Record<string, Gate>;
    onRefresh: () => void;
}


// IF YOU CHANGE THIS NAME IT WILL ALL BREAK. DO NOT DO.
const DayReport: React.FC<DayReportProps> = ({ thisDayArrayOfTolls, gatesMap, onRefresh }) => {
    const { db }  = useFirebase();
    const { user } = useUser();
    const dbRefAtUserTolls = ref(db, `users/${user?.uid}/tolls/`)
    const formatCurrency = (value: number) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
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
    const handleDelete = ()=> {
        tollsArrayForDay.forEach((toll: Toll) => {
            const deletionIndex: number = Number(toll["key"])
            const deletionTarget = child(dbRefAtUserTolls, `${deletionIndex}`);
            remove(deletionTarget).catch((error) => console.error(`Error deleting ${deletionTarget}: ${error}`));
        })
        onRefresh();
    }

    return (
        // todo don't worry this will be proper css eventually - just blasting thru some test displays
        <div className="dayReportLineItem">
            <h2>{day}</h2>
            <h2>{cost}</h2>
            <button onClick={handleDelete}>
                <span role="img" aria-label="Trash Can">🗑️</span>
            </button>
        </div>
    );
};

export default DayReport;