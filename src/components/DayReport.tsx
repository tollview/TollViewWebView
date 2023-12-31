import React from "react";

interface DayReportProps {
    thisDayAndCost: [number, number]; // Assuming both elements are numbers
}

const DayReport: React.FC<DayReportProps> = ({ thisDayAndCost }) => {
    const formatCurrency = (value: number) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    return (
        //todo don't worry this will be proper css eventually - just blasting thru some test displays
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "75vw" }}>
            <h2>{thisDayAndCost[0]}</h2>
            <h2>{formatCurrency(thisDayAndCost[1])}</h2>
        </div>
    )
}

export default DayReport

