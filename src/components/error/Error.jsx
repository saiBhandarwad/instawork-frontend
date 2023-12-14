import React from 'react'
import './style.css'
export default function Error({msg}) {
  return (
    <div className='error_container'>
        <div className="error_msg">{msg}</div> 
        <div className="close_btn">❌</div>
        <div className="progress_line"></div>
    </div>
  )
}
