import { Database, ref, set } from "firebase/database";
import { Gate } from "../models/Gate.ts";
import { User } from "firebase/auth";

interface SeedDemoDataProps {
    db: Database;
    gatesList: Array<Gate>;
    user: User | null;
}

const seedDemoData = async ({ db, gatesList, user }: SeedDemoDataProps): Promise<void> => {
    try {
        if (!user) {
            console.error("User not found while seeding demo data");
            return;
        }
        const allGateIds = gatesList.map((gate) => gate.id);
        const randomGateId = allGateIds[Math.floor(Math.random() * allGateIds.length)];
        console.log(randomGateId);

    } catch (error) {
        console.error("Error seeding demo data:", error);
    }
};

export default seedDemoData;