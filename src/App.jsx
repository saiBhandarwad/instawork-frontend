import React, { createContext, useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Filter from './components/filter/Filter'
import Job from './components/job/Job'
import './App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const MyContext = createContext()
export default function App() {
  const [showFilter, setShowFilter] = useState()
  const navigate = useNavigate()
  const token = localStorage.getItem("auth-token")
  const [contextValue, setContextValue] = useState()
  const fetchWorks = () => {
    axios.post("https://instawork-backend.vercel.app/work/works", {
      headers: {
        token
      }
    }).then((res) => {
      console.log({ res })
      setContextValue({ works: res.data.works, handleFilter })
    }).catch((err) => console.log({ err }))
  }
  const validateUser = () => {
    axios.post("https://instawork-backend.vercel.app/user/validateUser", {
      data: { token }
    }).then((res) => {
      if (res.data.success) {
        // nothing to do
      } else {
        navigate("/login")
      }
    }).catch((error) => {
      console.log({ error })
    })

  }
  useEffect(() => {
    try {
      // dispatch(fetchUserAsync(token))
      validateUser()
      fetchWorks()
    } catch (error) {
      console.warn("failed to getting works from database ", error.message);
    }

  }, [])
  const handleFilter = async (obj, sortBy, sortType) => {
    const res = await axios.post("https://instawork-backend.vercel.app/work/getWorksByFilter", {
      data: { filterOBJECT: obj, sortBy, type: sortType },
      headers: { token }
    })
    setContextValue({ works: res.data.works, handleFilter })
  }
  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }
  return (
    <>
      <MyContext.Provider value={contextValue}>
        <Navbar />
        <div className="main_heading_container">
          <div className="main_heading">Ab Paise Ki Tension Ko Karo Bye Bye!
            <br />
            Find Work With Us!</div>
        </div>
        <div className="filter_handler_container">
          <div className="filter_handler" onClick={toggleFilter}>
            <i className="fa-solid fa-filter"></i>
            <span>Filter</span>
          </div>
          {showFilter && <div className="show_filter_holder">
          <i className="fa-solid fa-x" onClick={toggleFilter}></i>
            <Filter />
          </div>}
          

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
