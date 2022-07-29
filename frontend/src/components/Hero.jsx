import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { listBuses } from "../actions/busActions";
import busLandingPage from "../assets/busLandingPage.jpg";
import homeImage from "../assets/hero.png";
import DatePicker from "react-datepicker";
import Search from "./Search";
export default function Hero() {
//   const  [from, setFrom] = useState('')
//   const  [to, setTo] = useState('')
  

//   let  [departureDate, setDepartureDate] = useState(new Date())
  
  
//   // e.log(new Date())consol
 

//     const dispatch = useDispatch();
//     const buseList = useSelector(state => state.buseList);
//     const {loading, error, buses} = buseList;
//     useEffect(() => {
//         dispatch(listBuses({}));
//     }, [dispatch,from, to, departureDate]);
//    const navigate = useNavigate()
//    const chanheTheDate =  function(d){
//     return (d.getMonth() + 1) + 
//     "-" +  d.getDate() +
//     "-" +  d.getFullYear();
// } 

//     const submitHandler = (e) => {
//       departureDate = chanheTheDate(departureDate);
//       e.preventDefault();
//       navigate(`/search/name/from/${from}/to/${to}/departureDate/${departureDate}`);
//     };
  return (
    <Section id="hero">
      <div className="background ">
        <img src={busLandingPage} alt="" />
      </div>
      <div className="content">
        <div className="title">
          <h1>TRAVEL TO EXPLORE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            natus, enim ipsam magnam odit deserunt itaque? Minima earum velit
            tenetur!
          </p>
        </div>
        {/* <form onSubmit={submitHandler}>
        <div className="search">
        
        <div className="container">
          <label htmlFor="">Departure</label>
          <select required onChange={(e) => setFrom(e.target.value)} class="custom-select  select-location ">
          <option  value="" >Select Departure</option>
          <option value="sukkur">Sukkur</option>
          <option value="lahore"> Lahore </option>

          </select>
         </div>
          <div className="container">
          <label htmlFor="">Arrival</label>
    <select required onChange={(e) => setTo(e.target.value)} class="custom-select select-location">
      <option     value="">Select Arrival</option>
      <option value="karachi">Karachi</option>
      <option value="faisalabad">Faisalabad</option>

      </select>
          </div>
          <div className="container">
          <label htmlFor="">Departure Date</label>
    <DatePicker  className="custom-select select-location" selected={departureDate} onChange={(date) => setDepartureDate(date)} />

          </div>
          <button type="submit" class="btn btn-primary btn-lg select-location btn-for-all">Search</button>

        
        </div>
        </form> */}

        <Search></Search>
      </div>

    </Section>
  );
}

const Section = styled.section`
  position: relative;
  margin-top: 1rem;
  width: 100%;
  height: 100%;

  .background {
    height: 100%;
    img {
      width: 100%;
      filter: brightness(60%);
    }
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
      }
    }
    .search {
      display: flex;
      background-color: #ffffffce;
      padding: 0.5rem;
      padding-bottom: 1.2rem ;
      border-radius: 0.5rem;
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 1.5rem;
        label {
          font-size: 1.1rem;
          color: #03045e;
        }
        // input {
        //   // background-color: transparent;
        //   // border: none;
        //   text-align: center;
        //   color: black;
        //   &[type="date"] {
        //     padding-left: 3rem;
        //   }

          &::placeholder {
            color: black;
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        padding: 1rem;
        cursor: pointer;
        border-radius: 0.3rem;
        border: none;
        color: white;
        background-color: #4361ee;
        font-size: 1.1rem;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #023e8a;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 980px) {
    height: 25rem;
    .background {
      background-color: palegreen;
      img {
        height: 100%;
      }
    }
    .content {
      .title {
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
          padding: 1vw;
        }
      }
      .search {
        flex-direction: column;
        padding: 0.8rem;
        gap: 0.8rem;
        /* padding: 0; */
        .container {
          padding: 0 0.8rem;
          input[type="date"] {
            padding-left: 1rem;
          }
        }
        button {
          padding: 1rem;
          font-size: 1rem;
        }
        /* display: none; */
      }
    }
  }
`;
