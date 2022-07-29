
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
    bookSeats.bookedSeats.reduce((a, c) => a + c.qty * c.price, 0)
  );
  bookSeats.shippingPrice = bookSeats.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  bookSeats.taxPrice = toPrice(0.15 * bookSeats.itemsPrice);
  bookSeats.totalPrice = bookSeats.itemsPrice + bookSeats.shippingPrice + bookSeats.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...bookSeats, orderItems: bookSeats.bookedSeats }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order,navigate, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {bookSeats.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {bookSeats.shippingAddress.address},
                  {bookSeats.shippingAddress.city}, {bookSeats.shippingAddress.postalCode}
                  ,{bookSeats.shippingAddress.country}
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
                <h2>Order Items</h2>
                <ul>
                  {bookSeats.bookedSeats.map((item) => (
                    <li key={item.bus}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                            
                          <Link to={`/bus/${item.bus}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${bookSeats.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${bookSeats.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${bookSeats.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${bookSeats.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={bookSeats.bookedSeats.length === 0}
                >
                  Place Order
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