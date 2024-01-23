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
        for (const gate of gatesList) {
            for (let i = 0; i < 5; i++) {
                const tollData = {
                    gateId: gate.id,
                };
                const tollRef = ref(db, `users/${user.uid}/tolls/`);
                await set(tollRef, tollData);
            }
        }

        console.log("Demo data seeded successfully");
    } catch (error) {
        console.error("Error seeding demo data:", error);
    }
};

export default seedDemoData;
