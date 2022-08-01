import React, { useEffect, useState } from 'react'
import history from '../history';
import Ratting from '../components/Ratting'
import { Link, useNavigate, useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsBuses } from '../actions/busActions';
import angelleft from "./angle-left.svg"

import MovieSelector from "../components/MovieSelector"
import SeatAvailability from "../components/SeatAvailability"
import SeatMatrix from "../components/SeatMatrix"
import PriceCalculator from "../components/PriceCalculator"
import GithubLogo from '../components/GithubLogo'

import MovieContext from '../contexts/MovieContext'

// Prduction screen
export default function BusScreen(props){
  
	const [movies, EditMovies] = useState({
		movieNames: {
			"Bloodshot": 10,
			"The girl on the Train": 8,
			"The invisible Man": 11,
			"Onward": 12,
			"My Spy": 9
		},
		moviePrice: 10,
		totalSeats: 0,
		seatNumbers: []
	})
    const navigate  = useNavigate();
    const dispatch  = useDispatch();
    const  {id}  = useParams();
    const [qty,setQty] = useState(1)
    // const { id } = useParams();
    // const bus = data.buses.find((x) => x._id === id);
    const busDetails = useSelector((state) => state.busDetails);
    const {loading, error, bus} = busDetails;
    useEffect(() =>{
        // productid
        dispatch(detailsBuses(id));
    }, [dispatch, id]);
    const bookSeatHandler = () => {
        // cart
        
        navigate(`/bookedSeats/${id }?qty=${qty}`)
    }

    
    return(
       

        <div>
        {loading? ( 
         <LoadingBox> </LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : ( 

          <div className="container-fluid bus-screen-details">
          <div 
            className="bus-item row bus-screen-detail "
            key = {bus._id}
           >
            <div className=" col-1 ">
            {/* <button className='' onClick={() => navigate(-1)}><img src={angelleft}/></button> */}
           {/* { console.log(navigate(-1))} */}
      <button className='btn-back' onClick={()=>{navigate(-1)}}><p>{"<"}</p></button>
            </div>
            <div className="col-2 ml-n4 mt-4 ">
              <span
                className=" h4 text-uppercase"
                >
                {bus.seller.seller.name}
              </span>
            </div>
            <div className="col-2 ml-n3 border-left mt-3 mb-3">
            <div className="row">
                <div className="col-12 ">
                  <span className="p h5 font-weight-normal">Price: </span>
                  <span className="p font-weight-bold h5 text-capitalize">{bus.price}</span>
                </div>
                <div className="col-12 mt-2 ">
                  <span className="h5 p font-weight-normal">Seats Left: </span>
                  <span className="p font-weight-bold h5 text-capitalize">{bus.seats_remaining}</span>
                </div>
              </div>  
            </div>
            <div className="col-2 ml-n5 border-left mt-3 mb-3">
              <div className="row">
                <div className="col-12 ">
                  <span className="p h5 font-weight-normal">Type: </span>
                  <span className="p font-weight-bold h5">{bus.bus_type}</span>
                </div>

                <div className="col-12 mt-2  ">
                  <span className="p h5 font-weight-normal">Rating: </span>
                  <span className="p font-weight-bold h5"
                    ><i className="fas fa-star text-warning"></i>
                  {bus.rating} </span
                  >
                </div>
              </div>  
            </div>
            <div className="col-2 border-left mt-3 mb-3 ">
            <div className="row">
                <div className="col-12 ">
                  <span className="p h5 font-weight-normal">Departure: </span>
                  <span className="p font-weight-bold h5 text-capitalize">{bus.from}</span>
                </div>
                <div className="col-12 mt-2 ">
                  <span className="p h5 font-weight-normal">Arrival: </span>
                  <span className="p font-weight-bold h5 text-capitalize">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bus.to}</span>
                </div>
              </div>  
            </div>
            <div className="col-3  border-left mt-3 mb-3 ">
            <div className="row">
                <div className="col-12 ">
                  <span className="p h5 font-weight-normal">Departure Time: </span>
                  <span className="p font-weight-bold h5">10:00 AM</span>
                </div>
                <div className="col-12 mt-2 ">
                  <span className="p h5 font-weight-normal">Arrival Time: </span>
                  <span className="p font-weight-bold h5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;02:00 PM</span>
                </div>
              </div>  
            </div>


            



          </div>

          </div>
        )}

        <MovieContext.Provider value={{ movies, changeState: EditMovies }}>
          <div className=" row container-fluid">
        <div className="bus_seats col-2">
        <span class="badge badge-dark">Available Seats</span>

				<SeatMatrix />
    
		</div>
    <div className= "  col-2">
      <div className='bus_seats_book'>
      <span class="badge badge-dark ml-3">Seat Status</span>

      <SeatAvailability />


    {/* <MovieSelector />
    <PriceCalculator />
     */}
      </div>

     <div className="row">
     <button className="btn btn-primary book_btn_bus_screen" onClick={bookSeatHandler}>Book</button>
     </div>


    </div>

    </div>
		
    </MovieContext.Provider>
      


   </div>
       
    );
    }