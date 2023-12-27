import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function AppWrapper() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<AppWrapper />);

