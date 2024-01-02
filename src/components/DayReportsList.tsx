import React from "react";
import DayReport from "./DayReport";

interface DayReportsListProps {
    tollsByDate: { [key: string]: any };
    gatesMap: {};
}

const DayReportsList: React.FC<DayReportsListProps> = ({ tollsByDate, gatesMap }) => {
    return (
        <>
            {Object.entries(tollsByDate).map((thisDayArrayOfTolls: [string, any], index: number) => (
                <DayReport key={index} thisDayArrayOfTolls={thisDayArrayOfTolls} gatesMap={gatesMap}/>
            ))}
        </>
    );
};

export default DayReportsList;
