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
import Plane from '../components/Plane';
import { bookSeat } from '../actions/bookSeatsActions';


import styled from "styled-components";

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
    const [Sid, setSid] = useState("");
    // const { id } = useParams();
    // const bus = data.buses.find((x) => x._id === id);
    const busDetails = useSelector((state) => state.busDetails);
    const {loading, error, bus} = busDetails;
    const [seat, setSeat] = useState({});
    useEffect(() =>{
        // productid
        dispatch(detailsBuses(id));
    }, [dispatch, id]);
    const bookSeatHandler = () => {
        // cart
        console.log("SEATS: ", seat);
        dispatch(bookSeat(id, seat));
        navigate(`/bookedSeats/${id}`)
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

        {/* <MovieContext.Provider value={{ movies, changeState: EditMovies }}>
          <div className=" row container-fluid">
        <div className="bus_seats col-2">
        <span class="badge badge-dark">Available Seats</span>

				<SeatMatrix />
    
		</div>
    <div className= "  col-2">
      <div className='bus_seats_book'>
      <span class="badge badge-dark ml-3">Seat Status</span>

      <SeatAvailability />



      </div>



    </div>

    </div>
		
    </MovieContext.Provider> */}
      
     <div className="row">
       </div>
     <BiggerWrapper>
      <Wrapper>
      
        {
        bus && bus.seats.length > 0 ? (
          bus.seats.map((seat) => {
            // console.log(seat.id);
            return (
              <SeatWrapper key={`seat-${seat.id}`}>
                <label>
                  {seat.isAvailable ? (
                    <>
                      <Seat
                        type="radio"
                        name="seat"
                        onChange={() => {
                         
                          console.log("SID: ", seat.id);
                          setSid(seat.id);
                          setSeat({seatId: seat.id,uid:seat._id});
                          
                          // setSeatId(seat.id);
                          // let updatedValue = [];
                          // updatedValue = { seatId: seat.id };
                          // setReservationInfo((reservationInfo) => ({
                          //   ...reservationInfo,
                          //   ...updatedValue,
                          // }));
                          // console.log("INFO: ", reservationInfo);
                        }}
                      />
                      <Available>{seat.id}</Available>
                    </>
                  ) : (
                    <Unavailable>{seat.id}</Unavailable>
                  )}
                </label>
              </SeatWrapper>
            );
          })
        ) : (
          <Placeholder>Select a bus to view seating.</Placeholder>
        )}
      </Wrapper>  
      <SeatStatus> 
        
    <div className= "">
      <div className=''>
      <Infolabel class="badge badge-dark">Seat Status</Infolabel>

      <SeatAvailability />
      

      </div>
      <div className="row">
      <Button className="btn btn-primary book_btn_bus_screen" onClick={bookSeatHandler} disabled={Object.keys(seat).length === 0}>Book</Button>
  
    </div>


    </div>
</SeatStatus>
    </BiggerWrapper>
    


    </div>



       
    );
    }

    
const BiggerWrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 404px;
  width: 260px;
  text-align: center;
  color: #F79D00;
  font-family: var(--font-heading);
  font-size: 32px;
  opacity: 0.5;
`;
const SeatStatus = styled.div`

margin: 24px 24px 0 0;

 height: 170px;
width: 170px;
position: relative;

min-width: 170px;
border-radius: 10px;
color: #000000;
border: 2px solid  #DEE2E6;
`;
  
const Wrapper = styled.ol`
  display: grid;
  grid-template-rows: repeat(10, 30px);
  grid-template-columns: 30px 30px 60px 30px 30px 30px;
  gap: 12px 10px;
  background: #fff;
  border: 1px solid #AA001E;


  margin: 24px 24px 0 0;
  // padding: 30px 30px;
  // padding-right:30px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
   height: 450px;
    min-width: 300px;
    border-radius: 10px;

  border: 2px solid  #DEE2E6;
  position: relative;
`;
const SeatWrapper = styled.li`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  height: 30px;
  width: 30px;
`;
const Seat = styled.input`
  opacity: 0;
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 0;

  &:checked {
    + span {
      background: #AA001E;
      color: #fff;
      font-weight: 700;
    }
  }
`;
const SeatNumber = styled.span`
  border-radius: 2px;
  color: #D80026;
  font-family: var(--font-body);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  transition: all ease 300ms;
`;
const Available = styled(SeatNumber)`
  background: #fff;
  border: 1px solid #AA001E;
  cursor: pointer;

  &.checked,
  &:hover {
    background: #AA001E;
    color: #fff;
    font-weight: 700;
  }
`;
const Unavailable = styled(SeatNumber)`
  background: #FDBB01
  cursor: not-allowed;
  opacity: 0.4;
`;

const Infolabel = styled.span`
  background-color: #0077b6;
  color: white;
  padding: 0.2rem;
   border-radius: 0.2rem; 
  font-size: 1rem;
 margin: 1rem;
  `
  const Button = styled.button`

    width: 170px;
    margin: 2% auto;
    font-size: 1.rem;
    border-radius: 0.2rem;
    background-color: #0077b6;
    margin-top: 1.6rem;
  }
  `;
  