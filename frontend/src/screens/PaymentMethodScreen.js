import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/bookSeatsActions';
// import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

//cart ===bookSeats

//bookedSeats ===cartIems  
export default function PaymentMethodScreen(props) {
  const  navigate = useNavigate();
  const bookSeats = useSelector((state) => state.bookSeats);
  const { shippingAddress } = bookSeats;
  if (!shippingAddress.address) {
    // props.history.push('/shipping');
    navigate('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('JazzCash');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    // props.history.push('/placeorder');
    navigate('/placeorder');
    console.log(paymentMethod)
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="JazzCash"
              value="JazzCash"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="JazzCash">JazzCash</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="btn btn-primary btn-md  btn-for-all" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}