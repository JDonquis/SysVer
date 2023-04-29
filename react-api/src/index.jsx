import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import App from './app';
import Login from "./pages/Login"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);