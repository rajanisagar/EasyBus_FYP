import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listBuses } from '../actions/busActions';
import DatePicker from "react-datepicker";
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
    </form>
  );
}