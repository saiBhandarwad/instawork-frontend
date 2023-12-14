import React, { useContext, useEffect, useState } from 'react'
import locationIcon from '../../assets/location.png'
import salaryIcon from '../../assets/salary.png'
import dateIcon from '../../assets/calendar.png'
import durationIcon from '../../assets/hourglass.png'
import HistoryIcon from '../../assets/history.png'
import './style.css'
import { MyContext } from '../../App'
import axios from 'axios'
import Error from '../error/Error'
import Success from '../success/Success'
import { useLocation } from 'react-router-dom'

export default function Job() {
    const [showError, setShowError] = useState()
    const {state} = useLocation()
    const [showSuccess,setShowSuccess] = useState(state?.showSuccess)
    
    const obj = useContext(MyContext)
    console.log(obj);
    let msg = "error is occured"

    useEffect(()=>{
        setTimeout(()=>{
            setShowError(false)
        },5000)
        setTimeout(() => {
            setShowSuccess(false)
        }, 5000);
    },[])
    return (
        <>
            {obj?.works?.map((work) => {
                const { address, detail, city, duration, endDate, startDate, salary, salaryPeriod, type, user } = work
                let firstName;
                let lastName;
                axios.post("http://localhost:8080/user/getUser", {
                    data: {
                        email: user
                    }
                }).then(res => {
                    firstName = res.data.user.firstName
                    lastName = res.data.user.lastName
                })
                return (
                    <div className="job_container" key={work._id}>
                        <div className="job_title"> {type} </div>
                        <div className="company_info">{firstName} {lastName}</div>
                        <div className="job_location"><img src={locationIcon} alt="" />{city} {address}</div>
                        <div className="job_related_info">
                            <div className="job_start_date">
                                <p className='job_img_container'><img src={dateIcon} alt="" />START DATE</p>
                                <p className='text-center'>{startDate.slice(0, 10)}</p>
                            </div>
                            <div className="job_duration">
                                <p className='job_img_container'><img src={durationIcon} alt="" />DURATION</p>
                                <p className='text-center'>{duration} day</p>
                            </div>
                            <div className="job_validity">
                                <p className='job_img_container'><img src={dateIcon} alt="" />END BY</p>
                                <p className='text-center'>{endDate.slice(0, 10)}</p>
                            </div>
                            <div className="job_salary">
                                <p className='job_img_container'><img src={salaryIcon} alt="" />SALARY</p>
                                <p className='text-center'>&#8377; {salary}</p>
                            </div>
                        </div>
                        <div className="extra_info">
                            <div className="job_posted_info">
                                <img src={HistoryIcon} alt="" />
                                <span>3 days ago</span>
                            </div>
                            <div className="job_posted_info">
                                <img src={salaryIcon} alt="" />
                                <span>{salaryPeriod} Payment</span>
                            </div>
                        </div>
                        <div className="job_apply_btn">
                            <button>SAVE JOB</button>
                        </div>
                    </div>
                )
            })}
            {showError && <Error msg={msg} />}
            {showSuccess && <Success msg="login successful"/>}
        </>
    )
}
