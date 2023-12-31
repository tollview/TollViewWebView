import React from "react";

const DayReport = ({thisDayAndCost}) => {
    return (
        //todo don't worry this will be proper css eventually - just blasting thru some test displays
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "75vw" }}>
            <h2>{JSON.stringify(thisDayAndCost[0])}</h2>
            <h2>{JSON.stringify(thisDayAndCost[1])}</h2>
        </div>
    )
}

export default DayReport