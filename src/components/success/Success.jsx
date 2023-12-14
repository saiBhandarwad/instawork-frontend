import React from 'react'
import './style.css'
export default function Success({msg}) {
  return (
    <div className='success_container'>
        <div className="close_btn">✅</div>
        <div className="success_msg">{msg}</div> 
        <div className="progress_line"></div>
    </div>
  )
}
