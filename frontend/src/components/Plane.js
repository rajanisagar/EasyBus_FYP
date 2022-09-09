import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { detailsBuses } from "../actions/busActions";
import SeatAvailability from "./SeatAvailability";
import FlightContext from "../flightContext";

const Plane = ({}) => {
  const navigate = useNavigate();
  const  {id}  = useParams();
  const dispatch  = useDispatch();
  const [seating, setSeating] = useState([]);
  const busDetails = useSelector((state) => state.busDetails);
  const {loading, error, bus} = busDetails;
  const [Sid, setSid] = useState("");
  useEffect(() =>{
      // productid
      
          
  dispatch(detailsBuses(id));
  //  setSeating(bus.seats);
      
  }, []);
  
  
  const { reservationInfo, setReservationInfo } =
    useContext(FlightContext);
  //
  // useEffect(() => {
  //   // TODO: get seating data for selected flight

  //     fetch(`/api/buses/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log("LOG DATA: ", data);
  //         // console.log("DATA 2: ", data.data);
  //         // console.log("DATA SEATS: ", data.data.seats);
  //         setSeating(data.data.seats);
  //       });
  // }, [busId]);
  //
  const addToCartHandler = () => {
    
    navigate(`bookedSeats/${Sid}`);
  }
  return (
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
                          // setSeatId(seat.id);
                          let updatedValue = {};
                          updatedValue = { seatId: seat.id };
                          setReservationInfo((reservationInfo) => ({
                            ...reservationInfo,
                            ...updatedValue,
                          }));
                          console.log("INFO: ", reservationInfo);
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



<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Are You Sure to Checkout ?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Seat: {reservationInfo.seatId} <br/>
        Total Price: {bus && bus.price * 1}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
</div>
{/* <Button onClick={addToCartHandler} type="button" className="btn btn-primary book_btn_bus_screen" data-toggle="modal" data-target="#exampleModal">

     Book</Button> */}
     </div>


    </div>
</SeatStatus>
    </BiggerWrapper>
  );
};

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
  

export default Plane;




