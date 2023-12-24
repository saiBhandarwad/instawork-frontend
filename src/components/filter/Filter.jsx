import React, { useContext, useEffect, useRef, useState } from 'react'
import './style.css'
import filterIcon from '../../assets/filter-filled-tool-symbol.png'
import sortIcon from '../../assets/sort.png'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFilteredWorks } from '../../redux/authSlice'

export default function () {
  const allWorks = useSelector(state => state.user.allWorks)
  const dispatch = useDispatch()
  const [city, setCity] = useState()
  const [sortType, setSortType] = useState("asc")
  const [workType, setWorkType] = useState()
  // const [allWorks, setAllWorks] = useState()
  const [salaryRange, setSalaryRange] = useState('2k')
  const [salaryPeriod, setSalaryPeriod] = useState()
  const [sortBy, setSortBy] = useState()
  const [showWorkOptions, setShowWorkOptions] = useState()
  const [showLocationOptions, setShowLocationOptions] = useState()
  const [workTypeValue, setWorkTypeValue] = useState('')
  const [workTypeArray, setWorkTypeArray] = useState([])
  const [cityValue, setCityValue] = useState('')
  const [cityArray, setCityArray] = useState([])
  const workTypeRef = useRef()
  const locationRef = useRef()
  const token = localStorage.getItem("auth-token")
  useEffect(() => {
    if (allWorks?.length === 0) {
      setCityArray([])
      setWorkTypeArray([])
    }
  }, [])

  useEffect(() => {
    if (allWorks?.length > 0) {
      setWorkTypeArray(allWorks?.map((item) => item.type)
        .filter((item, i, arr) => arr.indexOf(item) === i)
        .filter(item => item.startsWith(workTypeValue)))
    } else {
      setWorkTypeArray([])
    }
  }, [workTypeValue])

  useEffect(() => {
    if (allWorks?.length > 0) {
      setCityArray(allWorks?.map(item => item.city)
        .filter((item, i, arr) => arr.indexOf(item) === i)
        .filter(item => item.startsWith(cityValue)))
    } else {
      setCityArray([])
    }
  }, [cityValue])

  document.addEventListener("click", () => {
    if (locationRef.current === document.activeElement) {
      setShowLocationOptions(true)
    } else {
      setShowLocationOptions(false)
    }
    if (workTypeRef.current === document.activeElement) {
      setShowWorkOptions(true)
    } else {
      setShowWorkOptions(false)
    }
  }, false)
  const handleSalaryRange = (e) => {
    const salaryBG = document.querySelector('.salary_range_bg')
    const salaryRange = document.querySelector('.salary_range')
    if (e.target.value === '0.5') {
      salaryBG.style.left = +e.target.value * 6.25 - 16 + "%"
      salaryRange.style.left = +e.target.value * 6.25 - 10 + "%"
      setSalaryRange(e.target.value.slice(0, 3).concat('k'))
      return;
    }
    if (+e.target.value < 5) {
      salaryBG.style.left = +e.target.value * 6.25 - 11.5 + "%"
      salaryRange.style.left = +e.target.value * 6.25 - 9 + "%"
    } else {
      salaryBG.style.left = +e.target.value * 6.25 - 7 + "%"
      salaryRange.style.left = +e.target.value * 6.25 - 3 + "%"
    }
    if (e.target.value === '10.5') {
      setSalaryRange(e.target.value.slice(0, 2).concat('k'))
      return;
    }
    setSalaryRange(e.target.value.slice(0, 1).concat('k'))
  }
  const handleWorkType = () => {
    setShowWorkOptions(true)
  }
  const handleLocation = () => {
    setShowLocationOptions(true)
  }
  const workTypeOnChangeFunction = (e) => {
    setWorkTypeValue(e.target.value)
    setWorkType(e.target.value)
  }
  const locationOnChangeFunction = (e) => {
    setCityValue(e.target.value)
    setCity(e.target.value)
  }
  const handleWorkOption = (e, item) => {
    workTypeRef.current.value = item
    setWorkTypeValue(item)
    setWorkType(item)
  }
  const handleCityOption = (e, item) => {
    locationRef.current.value = item
    setCityValue(item)
    setCity(item)
  }
  const handleApply = () => {
    let salary = salaryRange.slice(0, -1) * 1000
    if (city && workType && salary && salaryPeriod && sortBy && sortType) {
      let obj = { type: workType, city, salary: { $gte: salary }, salaryPeriod }
      dispatch(fetchFilteredWorks({ obj, sortBy, sortType, token }))
      console.log({ city, workType, salary, salaryPeriod, sortBy, token });
    }
  }
  const handleReset = () => {
    handleFilter()
  }

  const handleSortType = (e) => {
    let id = e.target.id
    if (id == "asc") {
      setSortType("asc")
      document.getElementById("asc").classList.add("active")
      document.getElementById("desc").classList.remove("active")
    } else {
      setSortType("desc")
      document.getElementById("desc").classList.add("active")
      document.getElementById("asc").classList.remove("active")
    }

  }
  return (
    <>
      <div className="filter_holder">
        <div className="filter_container">
          <div className="filter_icon">
            <img src={filterIcon} alt="" />
            <span>Filters</span>
          </div>
          <div className="profile">

            {/************************ Work Type ***************************************/}

            <label >Work Type</label>
            <br />
            <input type="text" ref={workTypeRef} placeholder='eg. Loading and Unloading' onClick={handleWorkType} onChange={workTypeOnChangeFunction} />

            {showWorkOptions &&
              <div className='work_option_container'>
                {
                  workTypeValue?.length === 0 && allWorks?.map((item) => item.type)
                    .filter((item, i, arr) => arr.indexOf(item) === i)
                    .map(item => <div className='work_option' key={item} onClick={(e) => handleWorkOption(e, item)}>{item}</div>)
                }
                {
                  workTypeValue?.length > 0 && workTypeArray?.length === 0 && <div className='work_option'>no match found</div> 
                }
                {workTypeValue?.length > 0 && workTypeArray?.length > 0 && workTypeArray?.map(
                  (item, i) => <div className='work_option' key={item} onClick={(e) => handleWorkOption(e, item)}>{item}</div>)
                }
                {allWorks?.length === 0 &&
                  <div className='location_option' >no data found</div>
                }
              </div>
            }
          </div>
          {/******************** location **************************************/}

          <div className="location">
            <label htmlFor="location">Location</label>
            <br />
            <input type="text" ref={locationRef} placeholder='eg. Pune' name='location' onClick={handleLocation} onChange={locationOnChangeFunction} />
            {showLocationOptions && <div className='location_option_container'>
              {cityValue?.length === 0 ? (
                allWorks.map((item) => item.city)
                  .filter((item, i, arr) => arr.indexOf(item) === i)
                  .map(item => <div className='work_option' key={item} onClick={(e) => handleCityOption(e, item)}>{item}</div>)
              ) : (
                cityArray?.length === 0 ? (
                  <div className='location_option' >no match found</div>
                ) : (
                  cityArray?.map((item) => <div className='location_option' key={item} onClick={(e) => handleCityOption(e, item)}>{item}</div>)
                )
              )}
              {allWorks?.length === 0 &&
                <div className='location_option' >no data found</div>
              }
            </div>}
          </div>

          <div className="salary">
            <label htmlFor="salary">Salary</label>
            <span className='salary_range'>{salaryRange}</span>
            <span className='salary_range_bg'></span>
            <br />
            <div className="range">
              <span>0.5k</span><input type="range" defaultValue="2" step='1' min='0.5' max='10.5' onChange={e => handleSalaryRange(e)} /> <span>10k</span>
            </div>
          </div>
          <div className="salary_period_container">
            <p>Salary Period</p>
            <div className="salary_period">
              <input type="radio" name='salary_period' onClick={() => setSalaryPeriod("daily")} />
              <label htmlFor="salary_period" > Daily</label>
              <input type="radio" name='salary_period' onClick={() => setSalaryPeriod("weekly")} />
              <label htmlFor="salary_period" > Weekly</label>
            </div>
          </div>
          <div className="sortby_container">
            <p><img src={sortIcon} alt="" />Sort By <button className='active' id='asc' onClick={handleSortType}>asc</button> <button id='desc' onClick={handleSortType}>desc</button></p>
            <div className="latest" >
              <input type="radio" name='sort' onClick={() => setSortBy("postedDate")} />
              <span>Latest</span>
            </div>
            <div className="duration" >
              <input type="radio" name='sort' onClick={() => setSortBy("duration")} />
              <span>Duration</span>
            </div>
            <div className="salary_sorter" >
              <input type="radio" name='sort' onClick={() => setSortBy("salary")} />
              <span>Salary</span>
            </div>
          </div>
          <button className='apply_btn' onClick={handleApply}>Apply</button>
          <button className='reset_btn' onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>

  )
}
