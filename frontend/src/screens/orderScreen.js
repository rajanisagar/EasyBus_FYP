import Axios from "axios";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteOrder, detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
 
    const {id} = useParams();
    
    const orderId = id;
    console.log(id)
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin)
    const  {userInfo} = userSignin 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  const navigate = useNavigate();

  const cancelReservationHandler = async () => {
    if (window.confirm('Are you sure to delete?')) {
      navigate('/orderhistory')
      
      await Axios.get(`/api/buses/cancelreservation/${orderId}`, {
        headers: {Authorization: `Bearer ${userInfo.token}`}
      })
      
   
     
    }
    
  }
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='marginTop container'>
      <h1>Reservation</h1>
      <div className="row top">
        <div className="col-6">
          <ul style={{listStyle: "none"}}>
            <li>
              <div className="card card-body">
                <h2>User Details</h2>
                <p>
                 
     
                  <strong>Name:</strong> {order.userDetails.fullName} <br />
                  <strong>Phone: </strong> {order.userDetails.address} <br />
                  <strong>CNIC: </strong> 
                  {order.userDetails.city}, <br/>
                  <strong>Postal Code: </strong> {order.userDetails.postalCode}<br/>
     
           
                </p>
                {/* {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )} */}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul  className="list-group list-group-flush">
                  {order.orderItems.map((item) => (
                    <li class="list-group-item" key={item.id}>
                      <div className="row">
                        
                         {item.seatId}
                         &ensp;
                          {/* <img
                            src={item.image}
                            alt={item.seatId}
                            className="small"
                          ></img> */}
                        
                        
                            
                          
                            {/* {item.bus.seller.seller.name} */}
                          
                            &ensp;
                            {/* {console.log("vvv",item.bus.from)} */}
                            {item.bus.from}&ensp;
                            {/* {"==>"} &ensp; */}
                            {item.to} &ensp; 
                           PKR {item.price}
                           
                        
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <div className="card card-body">
          <ul style={{listStyle: "none"}}>
              <li>
                <h2>Summary</h2>
              </li>
            
              <li>
                            <h2>
                                {/* {console.log(bookSeats.totalPrice)} */}
                                Total ({order.orderItems.reduce((a, c) => a + 1, 0)} Seats) : PKR {order.orderItems.reduce((a, c) => a + c.price * 1, 0)  } 
                            </h2>
                        </li>
                        <li>
                        <button
                  type="button"
                  onClick={cancelReservationHandler}
                  className="btn btn-danger btn-md  btn-for-all"
                  // disabled={bookSeats.bookedSeats.length === 0}
                >
                  Cancel Reservation
                </button>
                          </li>

              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          
          </div>
        </div>
      </div>
    </div>
  );
}