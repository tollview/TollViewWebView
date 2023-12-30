import React, { useEffect, useState } from 'react';
import { app } from '../scripts/firebaseConfig';
import { getDatabase, ref, child, onValue, DataSnapshot, get } from "firebase/database";
import { Toll } from "../models/Toll.ts";
import { Timestamp } from "../models/Timestamp.ts";
import { Gate } from "../models/Gate.ts";

const Home: React.FC = () => {
    const [displayable, setDisplayable] = useState<string | null>(null);
    const db = getDatabase(app);
    const [gatesList, setGatesList] = useState<Array<Gate>>([]);

    useEffect(() => {

        const fetchGates = async () => {
            const gatesRef = ref(db, 'gates/');
            try {
                const snapshot = await get(gatesRef);
                if (snapshot.exists()) {
                    const gatesData = snapshot.val();
                    const tempGatesList = gatesData.map((gateData: any) => ({
                        id: gateData.id,
                        name: gateData.name,
                        cost: Number(gateData.cost)
                    }));
                    return tempGatesList;
                } else {
                    console.log("gates unable to be found");
                    return [];
                }
            } catch (error) {
                console.error(error);
                return [];
            }
        };

        const buildTollsList = (gatesList: Array<Gate>) => {
            const dbRef = ref(db);
        
            const unsubscribe = onValue(child(dbRef, 'users'), (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const currentUserTollsList = snapshot.val()["8cdV1LLiTbZtNnQCoRYvs5qBhSn2"]["tolls"];
                    let displayVal = "";
        
                    currentUserTollsList.forEach((_toll: JSON, index: number) => {
                        const timestampModel: Timestamp = {
                            date: Number(currentUserTollsList[index]["timestamp"]["date"]),
                            hours: Number(currentUserTollsList[index]["timestamp"]["hours"]),
                            minutes: Number(currentUserTollsList[index]["timestamp"]["minutes"]),
                            month: Number(currentUserTollsList[index]["timestamp"]["month"])+1,
                            timezoneOffset: Number(currentUserTollsList[index]["timestamp"]["timezoneOffset"]),
                            year: Number(currentUserTollsList[index]["timestamp"]["year"])+1900,
                        }
                        const tollModel: Toll = {
                            gateId: JSON.stringify(currentUserTollsList[index]["gateId"]),
                            timestamp: timestampModel
                        }
                        console.log(tollModel.timestamp)
                        displayVal += `GateId: ${tollModel.gateId} at ${tollModel.timestamp}`
                    })
        
                    setDisplayable(displayVal);
                } else {
                    setDisplayable("No data available");
                }
            });
        
            // Return a function to unsubscribe from the listener when the component unmounts
            return () => unsubscribe();
        };

        fetchGates().then((fetchedGatesList) => {
            setGatesList(fetchedGatesList); // Update the state
            console.log(`GATES LIST FETCHED: ${fetchedGatesList}, size: ${fetchedGatesList.length}`)
            buildTollsList(fetchedGatesList); // Now build tolls list
        });

    }, [db]);

    return (
        <div>
            <p>{displayable}</p>
        </div>
    );
}

export default Home;
