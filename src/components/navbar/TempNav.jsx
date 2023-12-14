import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./tempNav.css"
export default function TempNav({ login, signup, home }) {
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login")
    }
    const handleSignup = () => {
        navigate("/signup")
    }
    const handleBar = () => {
        setShowMenu(true)
        document.querySelector(".menu_container").classList.remove("display_none")
    }
    const handleClose = () => {
        setShowMenu(false)
        document.querySelector(".menu_container").classList.add("display_none")
    }
    return (
        <>
            <nav className='nav_section'>
                <div className='nav_links'>
                    <div className="left"><span className='insta'>insta</span><span className='work'>work</span>.</div>
                    <div className="right desktopMenu">
                        <span className='nav_link_btn' onClick={() => navigate("/works")}>Find Works</span>
                        {home && <span className='nav_link_btn' onClick={() => navigate("/")}>Home</span>}
                        {signup && <span className='nav_link_btn' onClick={handleLogin}>Login</span>}
                        {login && <span className='nav_link_btn' onClick={handleSignup}>Signup</span>}

                    </div>
                    <div className="mobileMenu">
                        {!showMenu && <i className="fa-solid fa-bars" onClick={handleBar}></i>}
                    </div>
                </div>
            </nav>
            <div className="menu_container display_none">
                <div className="mobileMenu">
                    {showMenu && <i className="fa-solid fa-x" onClick={handleClose}></i>}
                </div>

                <div className="menu_inner_container">
                    <div className=''>SAIPRASAD BHANDARWAD</div>
                    <div className=''>s333bhandarwad@gmail.com
                        <hr className='line' />
                    </div>
                    <span className='' onClick={handleLogin}>Login</span>
                    <span className='' onClick={handleSignup}>Signup</span>
                    <span className='' onClick={() => navigate("/works")}>Find Works</span>
                </div>
            </div>
        </>
    )
}
