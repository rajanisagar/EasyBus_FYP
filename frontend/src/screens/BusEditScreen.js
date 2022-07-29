import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import { detailsBuses, updateBus } from '../actions/busActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { BUS_UPDATE_RESET } from '../constants/busConstants'
import DatePicker from "react-datepicker";  
import { set } from 'mongoose'

export default function BusEditScreen(){
   
   
    // e.log(new Date())consol
   
  
    
    
     const chanheTheDate =  function(d){
      return (d.getMonth() + 1) + 
      "-" +  d.getDate() +
      "-" +  d.getFullYear();
  } 



    const navigate = useNavigate()
    const {id }= useParams()
    
    const  [from, setFrom] = useState('')
    const  [to, setTo] = useState('');
    const [operator, setOperator] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [bus_type, setbus_type] = useState('')
    const [seats_remaining, setSeats_remaining] = useState('')
    const [description, setDescription] = useState('')
    let  [departureDate, setDepartureDate] = useState(new Date())
    
    
    const dispatch = useDispatch()
    const busDetails = useSelector(state => state.busDetails)
    const {loading, error, bus} = busDetails

    const busUpdate = useSelector(state =>  state.busUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = busUpdate
    console.log(successUpdate)
    
    useEffect(() => {
        if(successUpdate){
            console.log('jhgjh')
            dispatch({type: BUS_UPDATE_RESET})
            navigate('/buslist')
        }
        if(!bus || (bus._id !== id) || successUpdate)
        {
            dispatch(detailsBuses(id))
        } else {
            setOperator(bus.operator)
            setPrice(bus.price)
            setImage(bus.image)
            setbus_type(bus.bus_type)
            setSeats_remaining(bus.seats_remaining)
            setDescription(bus.description)
            setFrom(bus.from)
            setTo(bus.to)
            setDepartureDate(bus.departureDate)
        }
        
    }, [dispatch, id, bus ,successUpdate, navigate])
    const submitHandler = (e) => {
        departureDate = chanheTheDate(departureDate)
        e.preventDefault()
        dispatch(updateBus({_id: id,
        operator, price, image, bus_type, seats_remaining, description,from,to,departureDate
        }))
    }
    return(
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div><h1>Edit Bus {id}</h1></div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger' >{errorUpdate}</MessageBox>}
                {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant='danger'>{error}</MessageBox>
                :
                <>
                    <div>
                        <label htmlFor='operator'>Operator</label>
                        <input id='operator' type={'text'} placeholder='Enter Operator' value={operator} onChange={(e) => setOperator(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor='price'>Price</label>
                        <input id='price' type={'text'} placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor='image'>Image</label>
                        <input id='image' type={'text'} placeholder='EnterImage' value={image} onChange={(e) => setImage(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor='bus_type'>Bus Type</label>
                        <input id='bus_type' type={'text'} placeholder='Enter Bus Type' value={bus_type} onChange={(e) => setbus_type(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor='seats_remaining'>Seats</label>
                        <input id='seats_remaining' type={'text'} placeholder='Enter Total Seats' value={seats_remaining} onChange={(e) => setSeats_remaining(e.target.value)}>
                        </input>
                    </div>
                    


                    <div className="container">
      <label htmlFor="">Departure</label>
      <select required onChange={(e) => setFrom(e.target.value)} class="custom-select  select-location ">
      <option  value="" >From</option>
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
<DatePicker  className="custom-select select-location" placeholder='778678' onChange={(date) => setDepartureDate(date)} />

      </div>

  




                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea row='3' id='description' type={'text'} placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </div>
                    <div>
                        <label></label>
                        <button className='primary' type='submit'>
                            Update
                        </button>
                    </div>
                </>
                }

            </form>
        </div>
    )
}