import { DataSnapshot, get, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../contexts/FirebaseContext.tsx";
import { useUser } from '../contexts/UserContext.tsx';
import { Gate } from "../models/Gate.ts";
import { Timestamp } from "../models/Timestamp.ts";
import { Toll } from "../models/Toll.ts";
import DayReportsList from "../components/DayReportsList.tsx";
import {handleSignOut} from "../scripts/signOut.ts";
import seedDemoData from "../scripts/seedDemoData.ts";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { db }  = useFirebase();
    const [gatesList, setGatesList] = useState<Array<Gate>>([]);
    const [tollsList, setTollsList] = useState<Array<Toll>>([]);
    const [tollsByDate, setTollsByDate] = useState({});
    const [gatesMap, setGatesMap] = useState<Record<string, Gate>>({});
    const { user } = useUser();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const redirectToLogin = () => {
            if (!user) {
                navigate('/login');
            }
        };

        redirectToLogin();

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
                        const tollsList: Array<Toll> = [];
                        snapshot.forEach((childSnapshot) => {
                            const key = childSnapshot.key; // This is the Firebase key
                            const tollData = childSnapshot.val();

                            const timestampModel: Timestamp = {
                                date: Number(tollData["timestamp"]["date"]),
                                hours: Number(tollData["timestamp"]["hours"]),
                                minutes: Number(tollData["timestamp"]["minutes"]),
                                month: Number(tollData["timestamp"]["month"]) + 1,
                                timezoneOffset: Number(tollData["timestamp"]["timezoneOffset"]),
                                year: Number(tollData["timestamp"]["year"]) + 1900,
                            }

                            const tollModel: Toll = {
                                key: Number(key),
                                gateId: tollData["gateId"],
                                timestamp: timestampModel
                            }

                            tollsList.push(tollModel);
                        });
                        console.log(gatesList)
                        return tollsList;
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
                //todo this is just to satisfy the debugger for a quick demo build
                console.log(gatesList);
                console.log(tollsList);
                return [];
            }
        }

        const setupData = async () => {
            if (user) {
                const fetchedGatesList = await fetchGates();
                setGatesList(fetchedGatesList);
                const fetchedTollsList = await buildTollsList();
                setTollsList(fetchedTollsList);

                setGatesMap(fetchedGatesList.reduce((acc: Record<string, Gate>, gate: Gate) => {
                    acc[gate.id] = gate;
                    return acc;
                }, {}));

                setTollsByDate(fetchedTollsList.reduce((acc: Record<string, any>, toll: Toll) => {
                    const dateKey: string = `${toll.timestamp.year}-${toll.timestamp.month}-${toll.timestamp.date}`;
                    if (!acc[dateKey]) {
                        acc[dateKey] = [];
                    }

                    acc[dateKey].push(toll);

                    return acc;

                }, {}),);
            }
        };


        setupData();

    }, [user, navigate, db, refresh]);

    useEffect(() => {
        if (user && user.email && user.email.endsWith("fakemail.com")) {
            seedDemoData({
                db,
                gatesList,
                user
            });
        }
    }, [user, gatesList]);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleLogout = () => {
        handleSignOut();
        navigate('/login');
    }

    return (
        <div>
            {user ? <p>Welcome, {user.email}</p> : <p>No user logged in</p>}
            <button className="pageNavButton refreshButton" onClick={handleRefresh}>Refresh</button>
            <DayReportsList tollsByDate={tollsByDate} gatesMap={gatesMap} onRefresh={handleRefresh}/>
            <button className="pageNavButton logoutButton" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
