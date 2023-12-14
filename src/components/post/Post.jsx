import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
export default function Post() {
    const [workType,setWorkType] = useState()
    const [salary,setSalary] = useState()
    const [city,setCity] = useState()
    const [duration,setDuration] = useState()
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [detail,setDetail] = useState()
    const [address,setAddress] = useState()
    const [period,setPeriod] = useState()
    const navigate = useNavigate()
    const token = localStorage.getItem("auth-token")
    const workRef = useRef()
    const salaryRef = useRef()
    const cityRef = useRef()
    const durationRef = useRef()
    const startDateRef = useRef()
    const endDateRef = useRef()
    const detailRef = useRef()
    const addressRef = useRef()
    const periodRef = useRef()
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    },[])
    const handleActive = (e) =>{
        let id = e.target.id
        if(id=="daily"){
            setPeriod("daily")
            document.getElementById("daily").classList.add("active")
            document.getElementById("weekly").classList.remove("active")
        }else{
            setPeriod("weekly")
            document.getElementById("weekly").classList.add("active")
            document.getElementById("daily").classList.remove("active")
        }
        
    }
    const handlePost =async () =>{
        if(!workType){
            workRef.current.focus()
            workRef.current.classList.add("error-field")
            return
        }else{
            workRef.current.classList.remove("error-field")
        }
        if(!salary){
            salaryRef.current.focus()
            salaryRef.current.classList.add("error-field")
            return
        }else{
            salaryRef.current.classList.remove("error-field")
        }
        if(!city){
            cityRef.current.focus()
            cityRef.current.classList.add("error-field")
            return
        }else{
            cityRef.current.classList.remove("error-field")
        }
        if(!duration){
            durationRef.current.focus()
            durationRef.current.classList.add("error-field")
            return
        }else{
            durationRef.current.classList.remove("error-field")
        }
        if(!startDate){
            startDateRef.current.focus()
            startDateRef.current.classList.add("error-field")
            return
        }else{
            startDateRef.current.classList.remove("error-field")
        }
        if(!endDate){
            endDateRef.current.focus()
            endDateRef.current.classList.add("error-field")
            return
        }else{
            endDateRef.current.classList.remove("error-field")
        }
        if(!detail){
            detailRef.current.focus()
            detailRef.current.classList.add("error-field")
            return
        }else{
            detailRef.current.classList.remove("error-field")
        }
        if(!address){
            addressRef.current.focus()
            addressRef.current.classList.add("error-field")
            return
        }else{
            addressRef.current.classList.remove("error-field")
        }
        if(!period){
            periodRef.current.focus()
            periodRef.current.classList.add("error-field")
            return
        }else{
            periodRef.current.classList.remove("error-field")
        }
        
        try {
            const res = await axios.post("http://localhost:8080/work/postJob",{
            data:{
                workType,salary,city,duration,startDate,endDate,detail,address,period
            },
            headers:{
                 token
            }
        })
        console.log({res});
        }
         catch (error) {
            console.warn("some error occured while posting job, ",error.message)
        }
    }
    return (
        <>
        <Navbar home={true}/>
        <div className='post-container'>
            <div className="post-form">
                <div className="post-inner-container">
                    <p className='post-heading'>Find Worker With Us!</p>
                    <div className="post-detail">
                        <div className="post-left">
                            <div className="input-container">
                                <label htmlFor="" >Work Type</label>
                                <br />
                                <input type="text" placeholder='e.g. painting' ref={workRef} onChange={(e)=>setWorkType(e.target.value)}/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Salary</label>
                                <br />
                                <input type="number" placeholder='e.g. 500' ref={salaryRef}  onChange={(e)=>setSalary(e.target.value)}/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">City</label>
                                <br />
                                <input ref={cityRef} placeholder='e.g. pune' onChange={(e)=>setCity(e.target.value)}></input>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Duration</label>
                                <br />
                                <input type="number" placeholder='e.g. days in number' ref={durationRef}  onChange={(e)=>setDuration(e.target.value)}/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Salary Period</label>
                                <br />
                                <button ref={periodRef} className='salaryBtn' id="daily" onClick={handleActive}>Daily</button>
                                <button className='salaryBtn' id='weekly' onClick={handleActive}>Weekly</button>
                            </div>
                        </div>

                        <div className="post-right">
                            <div className="input-container">
                                <label htmlFor="">Start Date</label>
                                <br />
                                <input type="date" ref={startDateRef}  onChange={(e)=>setStartDate(e.target.value)}/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">End Date</label>
                                <br />
                                <input type="date" ref={endDateRef} onChange={(e)=>setEndDate(e.target.value)}/>
                            </div>
                           
                            <div className="input-container">
                                <label htmlFor="">Work Details</label>
                                <br />
                                <textarea ref={detailRef}  onChange={(e)=>setDetail(e.target.value)}></textarea>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Full Address</label>
                                <br />
                                <textarea ref={addressRef} onChange={(e)=>setAddress(e.target.value)}></textarea>
                            </div>
                            
                        </div>
                    </div>
                   <div className='postBtnContainer'>
                   <button className='postBtn' onClick={handlePost}>POST JOB</button>
                   </div>
                </div>
            </div>
        </div>
        </>
    )
}