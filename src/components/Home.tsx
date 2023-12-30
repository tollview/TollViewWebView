import React, {useEffect, useState} from 'react';
import {app} from '../scripts/firebaseConfig';
import {DataSnapshot, get, getDatabase, ref} from "firebase/database";
import {Toll} from "../models/Toll.ts";
import {Timestamp} from "../models/Timestamp.ts";
import {Gate} from "../models/Gate.ts";

const Home: React.FC = () => {
    const db = getDatabase(app);
    const [gatesList, setGatesList] = useState<Array<Gate>>([]);
    const [tollsList, setTollsList] = useState<Array<Toll>>([]);

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

        const currentUser = "8cdV1LLiTbZtNnQCoRYvs5qBhSn2"
        //todo DON'T HARDCODE THIS
        const buildTollsList = async () => {
            const tollsRef = ref(db, `users/${currentUser}/tolls/`);
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
                            gateId: JSON.stringify(tollsData[index]["gateId"]),
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
        }

        fetchGates().then(async (fetchedGatesList) => {
            setGatesList(fetchedGatesList); // Update the state
            setTollsList(await buildTollsList());
            console.log(`gates size: ${gatesList.length}; tolls size: ${tollsList.length}`)
        });

    }, [db]);

    return (
        <div>
            <p>{"we're still working on this part of the website"}</p>
        </div>
    );
}

export default Home;
