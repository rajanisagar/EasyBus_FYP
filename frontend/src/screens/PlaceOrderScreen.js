
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

//cart ===bookSeats

//bookedSeats ===cartIems 

export default function PlaceOrderScreen(props) {
  const  navigate = useNavigate();
  const bookSeats = useSelector((state) => state.bookSeats);
  if (!bookSeats.paymentMethod) {
    navigate('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;



  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  bookSeats.itemsPrice = toPrice(
    bookSeats.bookedSeats.reduce((a, c) => a + 1 * c.price, 0)
  );
  bookSeats.shippingPrice = bookSeats.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  bookSeats.taxPrice = toPrice(0.15 * bookSeats.itemsPrice);
  bookSeats.totalPrice = bookSeats.itemsPrice ;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    console.log(bookSeats.bookedSeats)
    
    dispatch(createOrder({ ...bookSeats, orderItems: bookSeats.bookedSeats }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order,navigate, success]);

  return (
    <div className='userDetailsM  '>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row container">
        <div className="col-6">
          <ul style={{listStyle: "none"}}>
            <li>
              <div className="card card-body">
                <h2>User Details</h2>
                <p>
                  <strong>Name:</strong> {bookSeats.shippingAddress.fullName} <br />
                  <strong>Phone: </strong> {bookSeats.shippingAddress.address} <br />
                  <strong>CNIC: </strong> 
                  {bookSeats.shippingAddress.city}, <br/>
                  <strong>Postal Code: </strong> {bookSeats.shippingAddress.postalCode}<br/>
                  {/* <strong>City: </strong> {bookSeats.shippingAddress.country} */}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {bookSeats.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Seats</h2>
                <ul  className="list-group list-group-flush">
                  {bookSeats.bookedSeats.map((item) => (
                    <li class="list-group-item" key={item.id}>
                      <div className="row">
                        
                         {item.seatId}
                         &ensp;
                          {/* <img
                            src={item.image}
                            alt={item.seatId}
                            className="small"
                          ></img> */}
                        
                        
                            
                          
                            {item.seller.seller.name}
                          
                            &ensp;
                            {item.from}&ensp;
                            {"==>"} &ensp;
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
                                {console.log(bookSeats.totalPrice)}
                                Total ({bookSeats.bookedSeats.reduce((a, c) => a + 1, 0)} Seats) : PKR {bookSeats.bookedSeats.reduce((a, c) => a + c.price * 1, 0)  } 
                            </h2>
                        </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="btn btn-primary btn-md  btn-for-all"
                  disabled={bookSeats.bookedSeats.length === 0}
                >
                  Checkout
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