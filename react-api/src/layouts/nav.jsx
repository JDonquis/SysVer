import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/layouts/nav.css";
import logoCircle_blue from "../assets/img/logoCircle_blue.png";
import PeopleIcon from '@mui/icons-material/People';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function nav(props) {
    const [menuStatus, setMenuStatus] = useState(true)

    useEffect(() => {
      
        props.getNavStatus(menuStatus)
    
    }, [menuStatus])
  
    useEffect(() => {
        window.addEventListener('resize', (e) => {
            e.target.innerWidth < 1110 ? setMenuStatus(false)  : setMenuStatus(true) 
        }
        );
     
    }, [])
    

    return (
        <nav className={`left_nav ${menuStatus ? 'open' : 'closed'}`}>
            <div className="w-100 h-100 overflow-hidden nav_into_container">

           
            <Link className="header" to="/dashboard">
                    <img
                        src={logoCircle_blue}
                        className="logo"
                        alt="logo del sistema"
                        />
                <p className="system_title">
                    SysVer
                </p>
            </Link>
            <DoubleArrowIcon className="arrowIcon" onClick={() => setMenuStatus(prev => !prev )} />
            <ul className="link_container">
                <li>
                    <NavLink to="/dashboard/usuarios">
                        <PeopleIcon />
                        <span className="text_link"> Usuarios</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/personal">
                        <PermContactCalendarIcon />
                        <span className="text_link"> Personal</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/asistencia">
                    <EditCalendarIcon />

                        <span className="text_link"> Asistencia de hoy</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/historial_de_asistencia">
                    <ListAltIcon />
                        <span className="text_link"> Historial de asistencia</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/areas">
                    <SportsGymnasticsIcon />
                        <span className="text_link"> Areas</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/pagos">
                    <PointOfSaleIcon />
                        <span className="text_link"> Pagos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/historial_de_pagos">
                    <ReceiptIcon />
                        <span className="text_link"> Historial de pagos</span>
                    </NavLink>
                </li>
                
                {/* for the director */}
                <li>
                    <NavLink to="/dashboard/estados_de_cuenta">
                    <AccountBalanceIcon />
                        <span className="text_link"> Estados de cuenta</span>
                    </NavLink>
                </li>
            </ul>
            </div>
        </nav>
    );
}
