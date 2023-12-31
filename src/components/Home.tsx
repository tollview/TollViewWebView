import { DataSnapshot, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Gate } from "../models/Gate.ts";
import { Timestamp } from "../models/Timestamp.ts";
import { Toll } from "../models/Toll.ts";
import { app } from '../scripts/firebaseConfig';

const Home: React.FC = () => {
    const db = getDatabase(app);
    const [gatesList, setGatesList] = useState<Array<Gate>>([]);
    const [tollsList, setTollsList] = useState<Array<Toll>>([]);
    const { user } = useUser();
    let [ tollsByDate, setTollsByDate ] = useState({});

    useEffect(() => {

        const fetchGates = async () => {
            const gatesRef = ref(db, 'gates/');
            try {
                const snapshot = await get(gatesRef);
                if (snapshot.exists()) {
                    const gatesData = snapshot.val();
                    return gatesData.map((gateData: any) => ({
                        id: gateData.id,
                        name: gateData.name,
                        cost: Number(gateData.cost)
                    }));
                } else {
                    console.log("gates unable to be found");
                    return [];
                }
            } catch (error) {
                console.error(error);
                return [];
            }
        };
        
        const buildTollsList = async () => {
            if (user) {
                const tollsRef = ref(db, `users/${user.uid}/tolls/`);
                try {
                    const snapshot: DataSnapshot = await get(tollsRef);
                    if (snapshot.exists()) {
                        const tollsData = snapshot.val();
                        const tollsList: Array<Toll> = [];
                        tollsData.forEach((_toll: JSON, index: number) => {
                            const timestampModel: Timestamp = {
                                date: Number(tollsData[index]["timestamp"]["date"]),
                                hours: Number(tollsData[index]["timestamp"]["hours"]),
                                minutes: Number(tollsData[index]["timestamp"]["minutes"]),
                                month: Number(tollsData[index]["timestamp"]["month"])+1,
                                timezoneOffset: Number(tollsData[index]["timestamp"]["timezoneOffset"]),
                                year: Number(tollsData[index]["timestamp"]["year"])+1900,
                            }
                            const tollModel: Toll = {
                                gateId: tollsData[index]["gateId"],
                                timestamp: timestampModel
                            }
                            tollsList.push(tollModel)
                        });
                        return tollsList
                    } else {
                        console.log("tolls unable to be found");
                        return [];
                    }
                } catch (error) {
                    console.error(error);
                    return [];
                }
            } else {
                console.log("User not found");
                return [];
            }
        }

        const setupData = async () => {
            if (user) {
                const fetchedGatesList = await fetchGates();
                setGatesList(fetchedGatesList);
                const fetchedTollsList = await buildTollsList();
                setTollsList(fetchedTollsList);

                // Convert the gates list to a map for easier lookup
                const gatesMap = fetchedGatesList.reduce((acc, gate: Gate) => {
                    acc[gate.id] = gate;
                    return acc;
                }, {});

                console.log(`GATESMAP: ${JSON.stringify(gatesMap["96b26fb5-094e-4afb-a307-69233d77267a"]["cost"])}`)

                console.log(`gatesList size: ${fetchedGatesList.length}, tollsList size: ${fetchedTollsList.length}`);
                console.log(`fetchedTollsList: ${JSON.stringify(fetchedTollsList[0]["gateId"])}`)
                setTollsByDate(fetchedTollsList.reduce((acc, toll: Toll) => {
                    const dateKey = `${toll.timestamp.year}-${toll.timestamp.month}-${toll.timestamp.date}`;
                    if (!acc[dateKey]) {
                        acc[dateKey] = 0;
                    }
                    
                    // TODO: How we get toll.gateId is wrong, works when hardcoded with the console.log above
                    console.log(`gateId was: ${gatesMap[toll.gateId]}`)
                    const gate = gatesMap[toll.gateId];
                    console.log(`GATE WAS: ${JSON.stringify(gate)}`)
                    if (gate) {
                        acc[dateKey] += Number(gate.cost);
                    }

                    return acc;
                }, {}));
                console.log(tollsByDate);
            }
        };


        setupData();

    }, [user]);

    return (
        <div>
            {user ? <p>Welcome, {user.email}</p> : <p>No user logged in</p>} 
            <p>{ JSON.stringify(tollsByDate)} </p>
        </div>
    );
}

export default Home;
