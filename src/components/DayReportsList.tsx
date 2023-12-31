import React from "react";
import DayReport from "./DayReport";

interface DayReportsListProps {
    tollsByDate: { [key: string]: any };
}

const DayReportsList: React.FC<DayReportsListProps> = ({ tollsByDate }) => {
    return (
        <>
            {Object.entries(tollsByDate).map((thisDayAndCost: [string, number], index: number) => (
                <DayReport key={index} thisDayAndCost={thisDayAndCost} />
            ))}
        </>
    );
};

export default DayReportsList;
