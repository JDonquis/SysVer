import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/layouts/nav.css";
import logoCircle_blue from "../assets/img/logoCircle_blue.png";
import PeopleIcon from '@mui/icons-material/People';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
export default function nav(props) {
    const [menuStatus, setMenuStatus] = useState(true)

    useEffect(() => {
      
        props.getNavStatus(menuStatus)
    
    }, [menuStatus])
    
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

                        <span className="text_link"> Asistencia</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/areas">
                    <SportsGymnasticsIcon />
                        <span className="text_link"> Areas</span>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to="/dashboard/pagos">
                    <PointOfSaleIcon />
                        <span className="text_link"> Pagos</span>
                    </NavLink>
                </li> */}
                
            </ul>
            </div>
        </nav>
    );
}
