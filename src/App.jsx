import React, { createContext, useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Filter from './components/filter/Filter'
import Job from './components/job/Job'
import './App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const MyContext = createContext()
import boyImg from './assets/boy.png'
export default function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("auth-token")
  const [contextValue, setContextValue] = useState()
  const fetchWorks = () => {
    axios.post("http://localhost:8080/work/works", {
      headers: {
        token
      }
    }).then((res) => {
      console.log({ res })
      setContextValue({ works: res.data.works, handleFilter })
    }).catch((err) => console.log({ err }))
  }
  const validateUser = () => {
    axios.post("http://localhost:8080/user/validateUser", {
      data: { token }
    }).then((res) => {
      if (!res.data.success) {
        navigate("/login")
      }
    }).catch((error) => {
      console.log({ error })
    })

  }
  useEffect(() => {
    try {
      validateUser()
      fetchWorks()
    } catch (error) {
      console.warn("failed to getting works from database ", error.message);
    }

  }, [])
  const handleFilter = async (obj, sortBy, sortType) => {
    const res = await axios.post("http://localhost:8080/work/getWorksByFilter", {
      data: { filterOBJECT: obj, sortBy, type: sortType },
      headers: { token }
    })
    setContextValue({ works: res.data.works, handleFilter })
  }
  return (
    <>
      <MyContext.Provider value={contextValue}>
        <Navbar />
        {/* <div className="upper_container">
          <div className="intro">
            <div className="left">
              <p className='intro_heading'>Ab paise ki tension ko karo bye!</p>
              <p className='intro_text'>Find work with us!</p>
            </div>
            <div className="right"><img src={boyImg} height="100px" alt="" /></div>
          </div>
        </div> */}
        <div className="filter_handler_container">
          <div className="filter_handler">
            <i className="fa-solid fa-filter"></i>
            <span>Filter</span>
          </div>
          <div className='status'>{contextValue?.works?.length} {contextValue?.works?.length <= 1 ? "Job" : "Jobs"} Found..</div>
        </div>
        <div className="app_container">
          <Filter />
          <div className="job_holder">
            <Job />
          </div>
        </div>
      </MyContext.Provider>
    </>
  )
}
