import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Nav from "./layouts/nav";
import Dashboard from "./pages/Dashboard";
import Asistencia from "./pages/Asistencia";
import Personal from "./pages/Personal";

export default function app() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
            <div className="dashboard_container">
                <Nav />
                <main className="main_dashboard">
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/usuarios" element={<Usuarios />}></Route>
                        <Route path="/personal" element={<Personal />}></Route>
                        <Route path="/asistencia" element={<Asistencia />}></Route>
                    </Routes>
                </main>
            </div>
        </>
    );
}
