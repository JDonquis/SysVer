
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../css/pages/login.css";
import circleLogo from "../assets/img/circleLogo.png";
import {Link, useNavigate} from 'react-router-dom'

import axios from '../api/axios'

export default function login() {
    const [ci, setCI] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/login', {ci, password})
            setCI('')
            setPassword('')
            navigate("/dashboard")
        } catch (error) {
            alert(error.response.data.message)
            console.log(error.response.data)

        }
    }

    useEffect(() => {
      
        document.querySelectorAll(".card_form input").forEach(input => {
            if (input.type !== 'file' && input.type !== 'submit') {
                if (input.value ) {
                    input.nextElementSibling.classList.add('focus_valid')
                    if (input.type === 'date') {
                        input.classList.add('focus_valid')
                    }
                }
                input.onfocus = () =>{ 
                    if (input.type === 'date') {
                        input.classList.add('focus_valid')
                    }
                    
                    input.nextElementSibling.classList.add('focus_valid')
                }
                input.onblur = () => {
                    if (input.type == 'date') {
                        !input.value ?  input.classList.remove('focus_valid'): ''
                    }
                    !input.value ? input.nextElementSibling.classList.remove('focus_valid') : ''
                }
            } else {
                input.onchange = () => input.style.color = '#21E6C1'
            }
        })


        
    }, [])

    const [frontSquaredX, setFrontSquaredX] = useState({transform: 'translateX(0)'})
    const [backSquaredX, setBackSquaredX] = useState({transform: 'translateX(0)'})
    const windowWidth = window.innerWidth
    useLayoutEffect(() => {
        document.onmousemove = (e) => {
            const cursorX = e.screenX
            const cursorY = e.screenY
            setFrontSquaredX({transform: `translate(${cursorX/ 100}px, ${cursorY/50}px)`})
            setBackSquaredX({transform: `translate(-${cursorX/ 100}px, -${cursorY/50}px)`})
        }
    }, [])
    // useEffect(() => {
    //   if ()
    
    
    // }, [ci || password])
    
    return (
        <div className="container_login bg-blue block md:grid">
            
            {/* squares for large screen */}
            <div className="container_squares hidden md:grid ">
              <div className="sqr1 sqrBack" style={backSquaredX}></div>
              <div className="sqr2" style={frontSquaredX}></div>
              <div className="sqr3 sqrBack" style={backSquaredX}></div>
              <div className="sqr4 sqrBack" style={backSquaredX}></div>
              <div className="sqr5 sqrBack" style={backSquaredX}></div>
              <div className="sqr6 sqrBack" style={backSquaredX}></div>
              <div className="sqr7" style={frontSquaredX} ></div>
              <div className="sqr8 sqrBack" style={backSquaredX}></div>
              <div className="sqr9" style={frontSquaredX} ></div>
              <div className="sqr10" style={frontSquaredX} ></div>
              <div className="sqr11" style={frontSquaredX} ></div>
              <div className="sqr12 sqrBack" style={backSquaredX}></div>
              <div className="sqr13 sqrBack" style={backSquaredX}></div>
              <div className="sqr14" style={frontSquaredX} ></div>
              <div className="sqr15" style={frontSquaredX} ></div>
              <div className="sqr16" style={frontSquaredX} ></div>
              <div className="sqr17" style={frontSquaredX}></div>
            </div>

            {/* squares for phone screen */} 
            <div className="container_squares grid md:hidden container_squares_cellphone">
              <div className="sqr1 sqrBack" style={backSquaredX}></div>
              <div className="sqr2" style={frontSquaredX}></div>
              <div className="sqr3 sqrBack" style={backSquaredX}></div>
              <div className="sqr4 sqrBack" style={backSquaredX}></div>
              <div className="sqr5 sqrBack" style={backSquaredX}></div>
              <div className="sqr6 sqrBack" style={backSquaredX}></div>
              <div className="sqr7" style={frontSquaredX} ></div>
              <div className="sqr8 sqrBack" style={backSquaredX}></div>
            
             
            </div>


            <div className="card_form">
                <form onSubmit={handleLogin}>
                
                    <span className="title_and_icon">
                        <div className="background_icon">
                            <img src={circleLogo} alt="" className="icon" />
                        </div>
                        <h1>Login</h1>
                    </span>
                <div className="body_form ">

                    <span>
                        <input
                            type="text" 
                            data-type="DNI"
                            id="DNI" 
                            name="DNI"
                            value={ci}
                            onChange={(e) => setCI(e.target.value)}
                        />
                        <label htmlFor="ins_DNI">CI: </label>
                    </span>
                    <span>
                        <input
                            type="password"
                            id="psw"
                            name="phone_s"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="psw">Contraseña: </label>
                        
                    </span>
                </div>
                    <input type="submit" className={`btn_submit disabled position-md-absolute ${ci.trim().length > 6 && password.trim().length > 1 ? 'active' : 'disabled'}` } value="INICIAR &#x25B8;" />
                </form>
            </div>
        </div>
    );
}
