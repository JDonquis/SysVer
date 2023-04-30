import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Nav from "./layouts/nav";
import Dashboard from "./pages/Dashboard";
import Asistencia from "./pages/Asistencia";
import Personal from "./pages/Personal";
import { useState } from "react";

export default function app() {
    const [navStatus, setNavStatus] = useState(true)
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />}></Route>
            </Routes>
            <div className="dashboard_container">
                <Nav getNavStatus={() => setNavStatus(prev => !prev)} />
                <main className="main_dashboard" >
                    <div className={`mainDashboard_container ${navStatus ? 'small' : 'large'}`}>

                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                        <Route path="/usuarios" element={<Usuarios />}></Route>
                        <Route path="/personal" element={<Personal />}></Route>
                        <Route path="/asistencia" element={<Asistencia />}></Route>
                    </Routes>
                    </div>
                </main>
            </div>
        </>
    );
}
