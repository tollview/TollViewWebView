import { createContext, useContext } from 'react';
import { getDatabase, Database } from 'firebase/database';
import { app } from '../scripts/firebaseConfig';

interface FirebaseContextType {
    db: Database;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('Error accessing database');
    }
    return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const db = getDatabase(app);

    return (
        <FirebaseContext.Provider value={{ db }}>
            {children}
        </FirebaseContext.Provider>
    );
};