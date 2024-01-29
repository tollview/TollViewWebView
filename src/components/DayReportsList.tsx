
import DayReport from "./DayReport";

interface DayReportsListProps {
    tollsByDate: { [key: string]: any };
    gatesMap: {};
    onRefresh: () => void;
}

const DayReportsList: React.FC<DayReportsListProps> = ({ tollsByDate, gatesMap, onRefresh }) => {
    return (
        <>
            {Object.entries(tollsByDate).map((thisDayArrayOfTolls: [string, any], index: number) => (
                <DayReport key={index} thisDayArrayOfTolls={thisDayArrayOfTolls} gatesMap={gatesMap} onRefresh={onRefresh}/>
            ))}
        </>
    );
};

export default DayReportsList;
