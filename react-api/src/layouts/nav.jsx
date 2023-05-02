import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/layouts/nav.css";
import logoCircle_blue from "../assets/img/logoCircle_blue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClipboardUser, faCalendarDays, faPlay } from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faPlay} className="arrowIcon" onClick={() => setMenuStatus(prev => !prev )} />
            <ul className="link_container">
                <li>
                    <NavLink to="/dashboard/usuarios">
                        <FontAwesomeIcon icon={faUsers} />
                        <span className="text_link"> Usuarios</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/personal">
                        <FontAwesomeIcon icon={faClipboardUser} />
                        <span className="text_link"> Personal</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/asistencia">
                    <FontAwesomeIcon icon={faCalendarDays} />
                        <span className="text_link"> Asistencia</span>
                    </NavLink>
                </li>
            </ul>
            </div>
        </nav>
    );
}
