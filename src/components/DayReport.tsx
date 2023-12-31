import React from "react";
import { Gate } from "../models/Gate.ts";

interface DayReportProps {
    thisDayArrayOfTolls: [string, any];
    gatesMap: Record<string, Gate>;
}

// IF YOU CHANGE THIS NAME IT WILL ALL BREAK. DO NOT DO.
const DayReport: React.FC<DayReportProps> = ({ thisDayArrayOfTolls, gatesMap }) => {
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

    return (
        // todo don't worry this will be proper css eventually - just blasting thru some test displays
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90vw" }}>
            <h2>{day}</h2>
            <h2>{cost}</h2>
            <button>
                <span role="img" aria-label="Trash Can">🗑️</span>
            </button>
        </div>
    );
};

export default DayReport;