import React, { useEffect, useState } from 'react'
import './style.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'
import empowerImg from "../../assets/empower.jpg"
import Footer from '../footer/footer';
import TempNav from '../navbar/TempNav';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    // showNumberAnimation()
    AOS.init({
      offset: 100,
      duration: 1000,
      once: true
    });
  }, [])
  // const showNumberAnimation = () =>{
  //   const counterObserver = new IntersectionObserver((entries,observe)=>{
  //     const [entry] = entries
  //     console.log(entry);
  //     if(!entry.isIntersecting)return

  //     const numbers = document.querySelectorAll('.num')
  //     function updateNumberCounter(){
  //       numbers.forEach(curElem=>{
  //         const targetNum = parseInt(curElem.dataset.number)
  //         const initialNum = parseInt(curElem.innerText.includes("+")?curElem.innerText.slice(0,-1):curElem.innerText)
  //         const incrementNum = Math.trunc(targetNum/800)
  //         if(initialNum < targetNum){
  //           curElem.innerText = initialNum + incrementNum + "+"
  //           setTimeout(updateNumberCounter,1)
  //         }
  //       })
  //     }
  //     updateNumberCounter()

  //   },{root:null,threshold:0})
  //   counterObserver.observe(document.querySelector(".why_choose_section"))
  // }

  return (
    <>
    <TempNav login={true} signup={true}/>
      <div className="home_main_container">
        <div className='img_container'>{/* for image */}</div>

        <div className="main_container">
          <div className='main_text_container' data-aos="zoom-in">
            <div className="heading ">Find all types <br /> of works with instawork.</div>
            <div className="description">Empowering Tomorrow's Youngsters: Make Money With Part Time Work with Our Comprehensive Platform!</div>
            <div className="get_started" onClick={()=>navigate("/login")}>Get Started</div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="empower_section">
          <div className="empower_left" data-aos="fade-up">
            <p className='empower_heading'>If you have the courage and the commitment to learn, we are here to empower you.</p>
            <p className='empower_text'>✅We are dedicated to provide all available works at your place.</p>
            <p className='empower_text'>✅Whether you are a student just out of school,</p>
            <p className='empower_text'>✅ a college/university student/who does preparation for government exams,</p>
            <p className='empower_text'>✅a person who need money to run your and family expenses,
            </p>
            <p className='empower_text'>✅a person who is new in big cities and does not getting work,
            </p>
            <p className='empower_text'>✅We strive to increase your chances to get work according to your preferences.</p>
          </div>
          <div className="empower_right" data-aos="fade-left">
            <img src={empowerImg} alt="" />
          </div>
        </div>
        <div className="number_counter_section" id='number_counter_section'>

          <ScrollTrigger onEnter={() => setShow(true)} >{/* onExit={()=>setShow(false)} */}
            <div className="number_counter">
              <div className="first">
                <p className='num' data-number="1200">
                  {show && <CountUp separator='' className='countup' start={0} end={2000} delay={0} duration={2} />}
                  +</p>
                <p>works</p>
              </div>
              <div className="second">
                <p className='num' data-number="800">
                  {show && <CountUp separator='' className='countup' start={0} end={800} delay={0} duration={2} />}
                  +</p>
                <p>presence in cities</p>
              </div>
              <div className="third">
                <p className='num' data-number="800">
                  {show && <CountUp separator='' className='countup' start={0} end={500} delay={0} duration={2} />}+
                </p>
                <p>happy users</p>
              </div>
              <div className="fourth">
                <p className='num' data-number="2000">
                  {show && <CountUp separator='' className='countup' start={0} end={600} delay={0} duration={2} />}+
                </p>
                <p>type of works</p>
              </div>
            </div>
          </ScrollTrigger>
        </div>

        <div className="why_choose_section">
          <div className="wc_first" data-aos="zoom-in-up">
            <div className="wc_first_heading">
              why instawork?
            </div>
            <div className="wc_first_description">
            Choose us for an get instant work at your location. Our platform stands out as a beacon of excellence, offering a curated works. Benefit daily and weekly payment assurance, flexible working timings, and a supportive community. With chat option you can chat with employer and can know more about work, embark on a transformative journey, gaining not just money but can earn experience in different domains.
            </div>
          </div>
          <div className="wc_second" data-aos="zoom-in-up">
            <i className="fa-solid fa-cubes"></i>
            <h3>Filter and Sorting</h3>
            <p className='wc_text'>We are trusted platforms, where you can get work with us, instawork provide filter and sorting functionality for finding jobs according to your preferences. </p>
          </div>
          <div className="wc_third" data-aos="zoom-in-up"><i className="fa-solid fa-circle-check"></i>
          <h3>Verified Accounts</h3>
            <p className='wc_text'>We already verified email and phone number of all who post job and applicant, you dont need to worry about verification.</p></div>
          <div className="wc_fourth" data-aos="zoom-in-up"><i className="fa-solid fa-file-invoice-dollar"></i>
          <h3>Payment Assurance</h3>
            <p className='wc_text'> we are here to give trusted jobs with payment assurance, you just need to browse jobs according to your preferences</p></div>
        </div>
      </div>
      <Footer />
    </>
  )
}
