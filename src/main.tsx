import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCm-l8Os6PK9OzSytq18r2NpH_zxHcXLKY',
    authDomain: 'tollview-dfw.firebaseapp.com',
    databaseURL: 'https://tollview-dfw-default-rtdb.firebaseio.com',
    projectId: 'tollview-dfw',
    storageBucket: 'tollview-dfw.appspot.com',
    messagingSenderId: '536066125827',
    appId: '1:536066125827:web:2098e3502eaad2501f9e36',
    measurementId: 'G-F5S51QK4L1',
};

function AppWrapper() {
    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const dbRef = ref(db);

        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => console.log(error));

        return () => {
        };
    }, []);

    return (
        <React.StrictMode>
            <App />
            <p>Main says hi</p>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<AppWrapper />);

