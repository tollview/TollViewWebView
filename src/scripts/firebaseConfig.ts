import { initializeApp } from 'firebase/app';

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

export const app = initializeApp(firebaseConfig);