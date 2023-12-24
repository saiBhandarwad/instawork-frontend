import React, { useEffect, useState } from 'react'
import locationIcon from '../../assets/location.png'
import salaryIcon from '../../assets/salary.png'
import dateIcon from '../../assets/calendar.png'
import durationIcon from '../../assets/hourglass.png'
import HistoryIcon from '../../assets/history.png'
import './job.css'
import axios from 'axios'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllWorks } from '../../redux/authSlice'

export default function Job() {
    const allWorks = useSelector(state => state.user.allWorks)
    const loading = useSelector(state => state.user.loading)
    const dispatch = useDispatch()
    const token = localStorage.getItem("auth-token")
    useEffect(() => {
        dispatch(fetchAllWorks(token))
    }, [])

    return (
        <>
            {allWorks.length === 0 && loading === false && <>
                <div className="job_container d-flex justify-content-center align-items-center"> NO DATA AVAILABLE</div>
                <div className="job_container d-flex justify-content-center align-items-center"> NO DATA AVAILABLE</div>
            </>}
            {loading && <>
                <div className="job_container d-flex justify-content-center align-items-center"> <Loader /></div>
                <div className="job_container d-flex justify-content-center align-items-center"> <Loader /></div>
            </>}
            {allWorks && allWorks?.map((work) => {
                const { address, detail, city, duration, endDate, startDate, salary, salaryPeriod, type, user, postedDate } = work
                const hours = (Date.now() - postedDate) / (1000 * 60 * 60) % 24
                const minutes = Math.floor(( (Date.now() - postedDate) / (1000 * 60)) % 60)
                let firstName;
                let lastName;
                axios.post("https://instawork-backend.vercel.app/user/getUser", {
                    data: {
                        email: user
                    }
                }).then(res => {
                    firstName = res.data.user.firstName
                    lastName = res.data.user.lastName
                })
                return (
                    <div className="job_container" key={work._id}>
                        <div className="job_title"> {type.split(" ").map(item => item.charAt(0).toUpperCase() + item.slice(1) + " ")}</div>
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
                                <span>
                                    {hours < 1 && Math.ceil(minutes) + " minutes ago"}
                                    {hours > 1 && hours < 24 && Math.ceil(hours) + " hours ago"}
                                    {hours >= 24 && Math.floor(hours/24) + " days ago"}
                                </span>
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
        </>
    )
}
