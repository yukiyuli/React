import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


// Set the adaptation of the mobile terminal
// the value rem is divided by the width of the viewport, now we set the total width of the viewport to 750rem
document.documentElement.style.fontSize = 100 / 750 + 'vw';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode>
    <App />
 // </React.StrictMode>
);

