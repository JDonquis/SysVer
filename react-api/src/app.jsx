import { Route, Routes } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Nav from "./layouts/nav";
import Dashboard from "./pages/Dashboard";
import Asistencia from "./pages/Asistencia";
import Personal from "./pages/Personal";
import Areas from "./pages/areas";
import Pagos from "./pages/Pagos";
import Historial_de_asistencia from "./pages/Historial_de_asistencia"
import { useState } from "react";

export default function app() {


    
    const [navStatus, setNavStatus] = useState(true)
    return (    
        <> 
            
            <div className="dashboard_container">
                <Nav getNavStatus={() => setNavStatus(prev => !prev)} />
                <main className="main_dashboard" >
                    <div className={`mainDashboard_container ${navStatus ? 'small' : 'large'}`}>

                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/usuarios" element={<Usuarios />}></Route>
                        <Route path="/personal" element={<Personal />}></Route>
                        <Route path="/areas" element={<Areas />}></Route>
                        <Route path="/asistencia" element={<Asistencia />}></Route>
                        <Route path="/historial_de_asistencia" element={<Historial_de_asistencia />}></Route>
                        <Route path="/pagos" element={<Pagos />}></Route>
                    </Routes>
                    </div>
                </main>
            </div>
        </>
    );
}
