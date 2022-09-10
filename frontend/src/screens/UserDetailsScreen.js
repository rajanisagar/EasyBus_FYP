import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/bookSeatsActions';
import CheckoutSteps from '../components/CheckoutSteps';
 

function UserDetailsScreen(props) {
    const  navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const bookSeats = useSelector((state) => state.bookSeats);
  const { shippingAddress } = bookSeats;
  if (!userInfo) {
    navigate('/signin')
    // props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    
    // props.history.push('/payment');
    navigate('/payment')
  };
  return (
    <div className='userDetailsM'>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Details</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
          className='form-control'
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Mobile</label>
          <input
          className='form-control'
            type="text"
            id="address"
            placeholder="Enter Phone Number"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">CNIC</label>
          <input
          className='form-control'
            type="text"
            id="city"
            placeholder="Enter CNIC Number"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
           className='form-control'
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
           className='form-control'
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="btn btn btn-primary btn-sm" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDetailsScreen;