import React, { useEffect, useState } from 'react'
import chatIcon from '../../assets/chat.png'
import savedIcon from '../../assets/bookmark.png'
import { useNavigate } from 'react-router-dom'
import './style.css'
export default function Navbar({ home }) {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const token = localStorage.getItem("auth-token")
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  })
  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    navigate("/login", { state: { showLogout: true } })
  }
  const handlePost = () => {
    navigate("/post")
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
      <nav>
        <ul className='nav_container'>
          <div className="left"><span className='insta'>insta</span><span className='work'>work</span>.</div>

          <div className="right">
            <img className='saved_icon' src={savedIcon} alt="" />
            <img className='chat_icon' src={chatIcon} alt="" />

            {!isAuthenticated ? <><button className='register_btn' onClick={() => navigate('/login')}>Login</button>
              <button className='register_btn' onClick={() => navigate('/signup')}>Register</button></> :
              home ? <span className='nav_link_btn' onClick={() => navigate("/")}>Home</span> : <span className='nav_link_btn' onClick={handlePost}>Post Job</span>
            }
            {isAuthenticated && <div className='profile_big_container'>
              <span className='profile_btn'>s</span>
              <div className='profile_container'>
                <div className='user_name'>SAIPRASAD BHANDARWAD</div>
                <div className='user_email'>s333bhandarwad@gmail.com</div>
                <hr className='line' />
                <div className="lower">
                  <div className='profile_home' onClick={() => navigate("/")}>home</div>
                  <div className='profile_post_job' onClick={() => navigate("/post")}>post job</div>
                  <div className='profile_logout' onClick={handleLogout}>logout</div>
                </div>
              </div>
            </div>}

          </div>
          {/* mobile nav */}
          <div className="auth_mobile_menu">
            {!showMenu && <i className="fa-solid fa-bars" onClick={handleBar}></i>}
          </div>
        </ul>
      </nav>
      {/* after clicking to show */}
      <div className="menu_container display_none">
        <div className="mobileMenu">
          {showMenu && <i className="fa-solid fa-x" onClick={handleClose}></i>}
        </div>

        <div className="menu_inner_container">
          <div className=''>SAIPRASAD BHANDARWAD</div>
          <div className=''>s333bhandarwad@gmail.com
            <hr className='line' />
          </div>
          <div className='container_for_cursor'>
            <div className='profile_home' onClick={() => navigate("/")}>Home</div>
            <div>My Jobs</div>
            <div>Chats</div>
            <div className='profile_post_job' onClick={() => navigate("/post")}>Post Job</div>
            <div className='profile_logout' onClick={handleLogout}>Logout</div>
          </div>

        </div>
      </div>
    </>
  )
}
