import { Database, ref, set } from "firebase/database";
import { Gate } from "../models/Gate.ts";
import { User } from "firebase/auth";
import { Timestamp } from "../models/Timestamp.ts";
import { Toll } from "../models/Toll.ts";

interface SeedDemoDataProps {
    db: Database;
    gatesList: Array<Gate>;
    user: User | null;
}

const getRandomGateId = (gatesList: Array<Gate>): string => {
    const allGateIds = gatesList.map((gate) => gate.id);
    return allGateIds[Math.floor(Math.random() * allGateIds.length)];
};

const offsetArray: Array<[number, number, number]> = [
    [-7, 0, 0],
    [-7, 0, -5],
    [-7, 0, -10],
    [-7, 0, -15],
    [-8, -2, -23],
    [-8, -2, -20],
    [-9, -6, -30],
    [-10, -3, -15],
    [-10, -3, -7],
    [-10, -3, -3],
    [-11, -22, -32],
    [-11, -22, -30],
    [-13, -6, -9],
    [-13, -6, -1],
    [-13, -5, -50]
];

const generateTimestamp = (offset: [number, number, number]): Timestamp => {
    const now = new Date();
    const timestampDate = new Date(now);

    timestampDate.setDate(now.getDate() + offset[0]);
    timestampDate.setHours(now.getHours() + offset[1]);
    timestampDate.setMinutes(now.getMinutes() + offset[2]);

    return {
        date: timestampDate.getDate(),
        hours: timestampDate.getHours(),
        minutes: timestampDate.getMinutes(),
        month: timestampDate.getMonth() + 1,
        timezoneOffset: timestampDate.getTimezoneOffset(),
        year: timestampDate.getFullYear(),
    };
};

const generateTolls = (gatesList: Array<Gate>): Array<Toll> => {
    const tolls: Array<Toll> = [];
    const arrayLength = offsetArray.length;

    for (let i = 0; i < arrayLength; i++) {
        const timestampOffset = offsetArray[i];
        const randomGateId = getRandomGateId(gatesList);
        const timestamp = generateTimestamp(timestampOffset);

        tolls.push({
            key: i,
            gateId: randomGateId,
            timestamp: timestamp,
        });
    }

    return tolls;
};

const seedDemoData = async ({ db, gatesList, user }: SeedDemoDataProps): Promise<void> => {
    try {
        if (!user) {
            console.error("User not found while seeding demo data");
            return;
        }

        const generatedTolls = generateTolls(gatesList);

        const userUid = user.uid;
        const userRef = ref(db, 'users/' + userUid);

        const userData = {
            preferences: {
                isDemo: true,
            },
            tolls: generatedTolls,
        };

        await set(userRef, userData);

    } catch (error) {
        console.error("Error seeding demo data:", error);
    }
};
export default seedDemoData;
