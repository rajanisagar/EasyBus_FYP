import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import styled from "styled-components";
import Bus from '../components/Bus.js';
import deals1 from '../assets/deals1.jpg'
import deals2 from '../assets/deals2.jpg'

import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { useDispatch, useSelector } from 'react-redux';
import { listBuses } from '../actions/busActions.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Recommend from "../components/Recommend";
import ScrollToTop from "../components/ScrollToTop";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import About from '../components/About.js';
import Ourapp from '../components/Ourapp.js';
export default function HomeScreen(){

  const  [from, setFrom] = useState('')
  const  [to, setTo] = useState('')

  let  [departureDate, setDepartureDate] = useState(new Date())
  
  
  // e.log(new Date())consol
 

    const dispatch = useDispatch();
    const buseList = useSelector(state => state.buseList);
    const {loading, error, buses} = buseList;
    useEffect(() => {
        dispatch(listBuses({}));
    }, [dispatch,from, to, departureDate]);
   const navigate = useNavigate()
   const chanheTheDate =  function(d){
    return (d.getMonth() + 1) + 
    "-" +  d.getDate() +
    "-" +  d.getFullYear();
} 

    const submitHandler = (e) => {
      departureDate = chanheTheDate(departureDate);
      e.preventDefault();
      navigate(`/search/name/from/${from}/to/${to}/departureDate/${departureDate}`);
    };
    return(



<div className='home'>
  
  {/* <ScrollToTop /> */}
     
      <Hero />
      <Services />
      <About/>
      
      <Ourapp/>
      {/* <h2 className="slider-header">Best Deals & Offers</h2> */}
      {/* <Carousel  className='slider' autoPlay showThumbs={false}>
      
          <div >
                <img src={deals1} />
             
          </div>
          <div>
          <img src={deals2} />
          </div>
  
  
           
      </Carousel> */}

      <Testimonials />
      <Footer/>
     </div>
      
          
      
    )
}
