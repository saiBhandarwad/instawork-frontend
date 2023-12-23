import React, { useEffect, useState } from 'react'
import welcomeImg from '../../assets/welcome.avif'
import mailImg from '../../assets/mail.png'
import lockImg from '../../assets/padlock.png'
import phoneIcon from '../../assets/telephone.png'
import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Error from '../error/Error'
import Success from '../success/Success'
import TempNav from '../navbar/TempNav'


export default function Login() {
    const [showError, setShowError] = useState()
    const [resOTP, setResOTP] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showOTP, setShowOTP] = useState()
    const [OTPSent, setOTPSent] = useState()
    const [mobileNumberVerified, setMobileNumberVerified] = useState()
    const [otpVerified, setOtpVerified] = useState()
    const { state } = useLocation()
    const [showLogout, setShowLogout] = useState(state?.showLogout)
    const navigate = useNavigate()
    useEffect(() => {
        loginUser()
        setTimeout(() => {
            setShowLogout(false)
        }, 5000);
    }, [])
    const handleMobileNum = (e) => {
        if (mobileNumberVerified === true) {
            setMobileNumberVerified(false)
        }
        const elem = document.getElementById("mobile_number")
        setPhone(e.target.value)
        if (e.target.value.length >= '10') {
            elem.value = e.target.value.slice(0, 10)
            setPhone(e.target.value.slice(0, 10))
            elem.classList.remove("error_field")
        } else {
            elem.classList.add("error_field")
        }
    }
    const sendOTP = async () => {
        if (mobileNumberVerified === true) {
            return;
        }
        if (phone.length == 10) {
            setShowOTP(true)
            // http://localhost:8081/sendOTP
            const res = await axios.post("https://instawork-backend.vercel.app/sendOTP", {
                data: {
                    phone
                }
            })
            if (res.data.success) {
                setOTPSent(true)
                setResOTP(res.data.OTP)
            } else if (res.data.success === false) {
                setOTPSent('')
            }
            console.log({ res });
        }
    }
    const handleOTP = (e, focusElem, verifyOTPFunction = null) => {

        if (e.target.value.length > 0) {
            document.getElementById(e.target.id).value = e.target.value.slice(e.target.value.length - 1)
            if (focusElem) {
                setTimeout(() => {
                    document.getElementById(focusElem).focus()
                }, 0);
            }
            if (verifyOTPFunction) {
                verifyOTPFunction()
            }
        }
    }
    const handleBackSpace = (e, focusElem) => {
        if (e.key == 'Backspace') {
            setTimeout(() => {
                document.getElementById(focusElem).focus()
            }, 0);
        }
    }
    const verifyOTP = async () => {
        const otp1 = document.getElementById("login_otp1").value
        const otp2 = document.getElementById("login_otp2").value
        const otp3 = document.getElementById("login_otp3").value
        const otp4 = document.getElementById("login_otp4").value
        let totalOTP = otp1 + otp2 + otp3 + otp4
        if (totalOTP == resOTP) {
            setOtpVerified(true)
            setMobileNumberVerified(true)
            setShowOTP(false)
            const res = await axios.post("https://instawork-backend.vercel.app/user/loginWithOTP", {
                data: {
                    phone
                }
            })
            if (res.data.token) {
                localStorage.setItem("auth-token", res.data.token)
                navigate("/works")
            }
            console.log({ res });
        } else {
            setOtpVerified(false)
        }
        setOTPSent('')

    }
    const handleLogin = async () => {
        if (email && password) {
            const res = await axios.post("https://instawork-backend.vercel.app/user/login", {
                data: {
                    email, password
                }
            })
            if (res.data.success) {
                navigate("/works", { state: { showSuccess: true } })
                if (res.data.token) {
                    localStorage.setItem("auth-token", res.data.token)
                }
            } else {
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                }, 5000)
                console.warn("login failed!");
            }

        }
    }
    const loginUser = async () => {
        const token = localStorage.getItem("auth-token")
        try {
            const res = await axios.post("https://instawork-backend.vercel.app/user/login", {
                headers: { "Authorization": token },
                data: {
                    email, password
                }
            })
            if (res.data.success) {
                navigate("/works", { state: { showSuccess: true } })
                if (res.data.token) {
                    localStorage.setItem("auth-token", res.data.token)
                }
                setResOTP(res.data.OTP)
                setShowOTP(false)
            } else {
                setShowError(true)
                setTimeout(() => {
                    setShowError(false)
                }, 5000)
                console.warn("login failed!");
            }
            console.log({ res });
        } catch (error) {
            console.warn("login failed!", error.message);
        }
    }
    return (
        <>
           <TempNav login={true} home={true}/>
            <div className="login_holder">
                <div className="login_container">
                    <div className="login_left">
                        <img src={welcomeImg} alt="" />
                    </div>
                    <div className="login_right_container">
                        <div className="login_right">
                            <p className='login_heading'>USER LOGIN</p>
                            <div className="user_holder">
                                <input type="text" id='login_email' placeholder='Enter email here' onChange={e => setEmail(e.target.value)} />
                                <img src={mailImg} alt="" id='userIcon' />
                            </div>
                            <div className="password_holder">
                                <input type="text" id='login_password' placeholder='Enter password here' onChange={e => setPassword(e.target.value)} />
                                <img src={lockImg} alt="" id='lockIcon' />
                            </div>
                            <div className="forgot_password">forgot password?</div>
                            <button className="login_btn" onClick={handleLogin}>LOGIN</button>
                            <p className='not_have_account' onClick={() => navigate("/signup")}>not have an account?</p>
                            <div className="or">OR</div>
                            <div className="login_with_mobile">
                                <input type="number" placeholder='Login With Mobile' id='mobile_number' onChange={(e) => handleMobileNum(e)} />
                                <button className='send_otp_btn' onClick={sendOTP}>SEND OTP</button>
                                <img src={phoneIcon} alt="" id='phoneIcon' />
                            </div>
                            {mobileNumberVerified && <p className='otp_status_success'>✅verified</p>}
                            {showOTP && <div className='otp_input_container' id="otp_container">
                                <label htmlFor="" className='labelForOTP'>Enter OTP : </label>
                                <input type="number" onChange={(e) => handleOTP(e, "login_otp2")} id='login_otp1' />
                                <input type="number" onChange={(e) => handleOTP(e, "login_otp3")} onKeyUp={e => handleBackSpace(e, "login_otp1")} id='login_otp2' />
                                <input type="number" onChange={(e) => handleOTP(e, "login_otp4")} onKeyUp={e => handleBackSpace(e, "login_otp2")} id='login_otp3' />
                                <input type="number" onChange={(e) => handleOTP(e, null, verifyOTP)} onKeyUp={e => handleBackSpace(e, "login_otp3")} id='login_otp4' />
                                <div className="otp_status_container">
                                    {OTPSent && <p className='otp_status_success'>✅ OTP sent successfully</p>}
                                    {otpVerified === false && <p className='otp_status_fail'>❌ wrong OTP</p>}
                                    {OTPSent === false && <p className='otp_status_fail'>❌ Invalid Number</p>}
                                </div>
                            </div>}
                        </div>

                    </div>
                </div>
            </div>

            {showError && <Error msg="login failed!" />}
            {showLogout && <Success msg="logout successfully!" />}
        </>
    )
}
