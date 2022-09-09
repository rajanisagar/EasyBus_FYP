import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listBuses } from '../actions/busActions';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
export default function Search(props) {
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
   const changeTheDate =  function(d){
    return (d.getMonth() + 1) + 
    "-" +  d.getDate() +
    "-" +  d.getFullYear();
} 

    const submitHandler = (e) => {
      departureDate = changeTheDate(departureDate);
      e.preventDefault();
      navigate(`/search/from/${from}/to/${to}/departureDate/${departureDate}`);
    };
  return (
    <form onSubmit={submitHandler}>
    <Wrapper className="search">
    
    <div className="container">
      {/* <label htmlFor="">Departure</label> */}
      <select required onChange={(e) => setFrom(e.target.value)} class="custom-select   ">
      <option  value="" >Select Departure</option>
      <option value="sukkur">Sukkur</option>
      <option value="lahore"> Lahore </option>

      </select>
     </div>
      <div className="container">
      {/* <label htmlFor="">Arrival</label> */}
<select required onChange={(e) => setTo(e.target.value)} class="custom-select ">
  <option     value="">Select Arrival</option>
  <option value="karachi">Karachi</option>
  <option value="faisalabad">Faisalabad</option>

  </select>
      </div>
      <div className="container">
      {/* <label htmlFor="">Departure Date</label> */}
<DatePicker  className="custom-select " selected={departureDate} onChange={(date) => setDepartureDate(date)} />

      </div>
      <button type="submit" class="btn btn-primary btn-lg  btn-for-all">Search</button>

    
    </Wrapper>
    </form>
  );
}

const Wrapper = styled.div `{
  display: flex;
  background-color: #ffffffce;
  padding: 0.5rem;
  // padding-bottom: 1.2rem ;
  border-radius: 0.5rem;
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // padding: 0 1.5rem;
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
    // .custom-select {
    //   height: 3.3rem;
    //   border:solid 0.5px rgb(188, 182, 182);
    // }

    button {
      padding: 0.5rem;
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
  }`;