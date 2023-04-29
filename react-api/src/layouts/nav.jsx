import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "../css/layouts/nav.css";
import logoCircle_blue from "../assets/img/logoCircle_blue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClipboardUser, faCalendarDays, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function nav() {
    const [menuStatus, setMenuStatus] = useState(true)


    return (
        <nav className={`left_nav ${menuStatus ? 'open' : 'closed'}`}>
            <Link className="header" to="/">
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
                    <NavLink to="/usuarios">
                        <FontAwesomeIcon icon={faUsers} />
                        <span className="text_link"> Usuarios</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/personal">
                        <FontAwesomeIcon icon={faClipboardUser} />
                        <span className="text_link"> Personal</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/asistencia">
                    <FontAwesomeIcon icon={faCalendarDays} />
                        <span className="text_link"> Asistencia</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
