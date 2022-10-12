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
          <label htmlFor="fullName">Full Name  <span className='text-danger'>*</span></label>
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
          <label htmlFor="address">Mobile <span className='text-danger'>*</span></label>
          <input
                 onKeyPress={(event) => {
                  console.log(event.key)
                  if (!/[0-9]/.test(event.key ) && event.key !== '+') {
                    
                    event.preventDefault();
                  }
    
                }}
                pattern="[+][0-9]{12}"
          className='form-control'
            type="text"
            id="address"
            placeholder="920000000000"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">CNIC <span className='text-danger'>*</span></label>
          <input
               onKeyPress={(event) => {
                console.log(event.key)
                if (!/[0-9]/.test(event.key ) && event.key !== '-') {
                  
                  event.preventDefault();
                }
  
              }}
        pattern="^[0-9]{5}-[0-9]{7}-[0-9]{1}$"
          className='form-control'
            type="text"
            id="city"
            placeholder="00000-0000000-0"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
                 onKeyPress={(event) => {
                  console.log(event.key)
                  if (!/[0-9]/.test(event.key ) ) {
                    
                    event.preventDefault();
                  }
    
                }}
          pattern="^[0-9]{5}$"
           className='form-control'
            type="text"
            id="postalCode"
            placeholder="12345"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        {/* <div>
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
        </div> */}
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