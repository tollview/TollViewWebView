import React, { useEffect, useState } from 'react';
import { app } from '../scripts/firebaseConfig';
import { getDatabase, ref, child, onValue, DataSnapshot, get } from "firebase/database";
import { Toll } from "../models/Toll.ts";
import { Timestamp } from "../models/Timestamp.ts";
import { Gate } from "../models/Gate.ts";

const Home: React.FC = () => {
    const [displayable, setDisplayable] = useState<string | null>(null);
    const db = getDatabase(app);
    const dbRef = ref(db);
    let gatesList: Array<Gate> = [];

    useEffect(() => {
        const gatesRef = ref(db, 'gates/');
        get(gatesRef).then((snapshot: DataSnapshot) => {
            if (snapshot.exists()) {

                gatesList = [];
                const gatesData = snapshot.val();

                gatesData.forEach((gateData: any) => {
                    const gateModel: Gate = {
                        id: gateData.id,
                        name: gateData.name,
                        cost: Number(gateData.cost)
                    }
                    console.log(`id: ${gateModel.id}`)
                    console.log(`name: ${gateModel.name}`)
                    console.log(`cost: ${gateModel.cost}`)
                    gatesList.push(gateModel);
                })

                console.log(`GATES LIST DONE: ${gatesList}`)

                console.log(`GATES LIST SIZE: ${gatesList.length}`)
                gatesList.forEach((gate) => {
                    console.log(`GATE: ${JSON.stringify(gate)}`)
                })

            }else{
                console.log("gates unable to be found");
            }
        }).catch((error) => console.log(error))
        
        

        const buildTollsList = () => {
            const unsubscribe = onValue(child(dbRef, 'users'), (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const currentUserTollsList = snapshot.val()["8cdV1LLiTbZtNnQCoRYvs5qBhSn2"]["tolls"];
                    //todo FIX THIS HARDCODING // hackers don't look here
                    let displayVal: string = ""
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
            return () => unsubscribe();
        };

        buildTollsList();
    }, [dbRef]);

    return (
        <div>
            <p>{displayable}</p>
        </div>
    );
}

export default Home;
