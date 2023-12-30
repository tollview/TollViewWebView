import React, { useEffect, useState } from 'react';
import { app } from '../scripts/firebaseConfig';
import { getDatabase, ref, child, onValue, DataSnapshot } from "firebase/database";
import {Toll} from "../models/Toll.ts";

const Home: React.FC = () => {
    const [displayable, setDisplayable] = useState<string | null>(null);
    const db = getDatabase(app);
    const dbRef = ref(db);

    useEffect(() => {
        const fetchData = () => {
            const unsubscribe = onValue(child(dbRef, 'users'), (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    const currentUserTollsList = snapshot.val()["8cdV1LLiTbZtNnQCoRYvs5qBhSn2"]["tolls"];
                    let displayVal: string = ""
                    currentUserTollsList.forEach((_toll: JSON, index: number) => {
                        const tollModel: Toll = {
                            gateId: JSON.stringify(currentUserTollsList[index]["gateId"]),
                            timestamp: JSON.stringify(currentUserTollsList[index]["timestamp"])
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

        fetchData();
    }, [dbRef]);

    return (
        <div>
            <p>{displayable}</p>
        </div>
    );
}

export default Home;
