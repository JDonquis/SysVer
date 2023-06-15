import { Route, Routes } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Nav from "./layouts/nav";
import Dashboard from "./pages/Dashboard";
import Asistencia from "./pages/Asistencia";
import Personal from "./pages/Personal";
import Areas from "./pages/areas";
import Pagos from "./pages/Pagos";
import Historial_de_pagos from  "./pages/Historial_de_pagos"
import Historial_de_asistencia from "./pages/Historial_de_asistencia"
import Estados_de_cuenta from "./pages/Estados_de_cuenta"
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "./api/axios";


export default function app() { 
  

    const checkSession = async () => {
        try {
          const response = await axios.get('/auth', {
            withCredentials: true
          });
      
          if (response.data.status === 'success') {
            console.log('Usuario con sesión activa:', response.data.data);
          }
        } catch (error) {
          console.log('No hay sesión activa');
        }
      };const getData = async () => {
        await axios.get("dashboard/areas").then((response) => {
            const data = response.data;
            setAreas(data.areas);
            setShifts(data.shifts);
        });
    };

    const [navStatus, setNavStatus] = useState(true)
   
    return (    
        <> 
            
            <div className="dashboard_container">
                <Nav getNavStatus={() => setNavStatus(prev => !prev)} status={navStatus} />
                <main className="top_nav_and_main" >
                    <div className="topNabvar w-full bg-blue p-4  mb-3 flex justify-end items-center relative ">
                        <div className="user_info cursor-pointer hover:underline ">

                           <span  className="mr-2"> Juan Villasmil </span><AccountCircleIcon></AccountCircleIcon>

                            <div className="user_actions absolute hidden rounded-md bg-white p-4 w-56 top-13 right-5 text-right"> 
                                <ul>
                                    <li className="mb-2"><a href="">Cambiar contraseña</a></li>
                                    <li className=""><a href="">Cerrar sesión</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`mainDashboard_container ${navStatus ? 'small' : 'large'}`}>
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/usuarios" element={<Usuarios />}></Route>
                        <Route path="/personal" element={<Personal />}></Route>
                        <Route path="/areas" element={<Areas />}></Route>
                        <Route path="/asistencia" element={<Asistencia />}></Route>
                        <Route path="/historial_de_asistencia" element={<Historial_de_asistencia />}></Route>
                        <Route path="/pagos" element={<Pagos />}></Route>
                        <Route path="/historial_de_pagos" element={<Historial_de_pagos />}></Route>
                        <Route path="/estados_de_cuenta" element={<Estados_de_cuenta />}></Route>
                    </Routes>
                    </div>
                </main>
            </div>
        </>
    );
}
