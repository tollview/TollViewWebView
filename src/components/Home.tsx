import React, { useEffect, useState } from 'react';
import { app } from '../scripts/firebaseConfig';
import { getDatabase, ref, child, onValue, DataSnapshot } from "firebase/database";

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
                    currentUserTollsList.forEach((_: JSON, index: number) => {
                        const gateId: string = JSON.stringify(currentUserTollsList[index]["gateId"]);
                        const year: number = Number(currentUserTollsList[index]["timestamp"]["year"]) + 1900;
                        const month: number = Number(currentUserTollsList[index]["timestamp"]["month"]) + 1;
                        const date: string = JSON.stringify(currentUserTollsList[index]["timestamp"]["date"]);
                        const dateFull: string = `${year} ${month} ${date}`
                        displayVal += (`${dateFull}: ${gateId}`);
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
