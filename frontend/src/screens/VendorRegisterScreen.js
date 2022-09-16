import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function VendorRegisterScreen(props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate  = useNavigate();
//   const redirect = props.location.search
//     ? props.location.search.split('=')[1]
//     : '/';
const { search } = useLocation();

const redirect = search ? search.split("=")[1] : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    console.log("hello  ")
    e.preventDefault();
    if(password !== confirmPassword){
      alert('password and Confirm Password does not match ')
    } else{
      dispatch(register(name,phone,cnic, email, password));
    }
   
  };
  useEffect(() => {
    if (userInfo) {
    //   props.history.push(redirect);
    navigate(redirect)
    }
  }, [search, redirect, userInfo]);
  return (
    <div className='marginTop'>
        
       
      <form className="form" onSubmit={submitHandler}>
        <div>
        <h1>Want to Be A Vendor </h1>
        <h5>Please Fill out Form to Register!</h5>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name <span className='text-danger'>*</span></label>
          <input
           className='form-control'
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="phone">Phone <span className='text-danger'>*</span></label>
          <input
            onKeyPress={(event) => {
              console.log(event.key)
              if (!/[0-9]/.test(event.key ) && event.key !== '+') {
                
                event.preventDefault();
              }

            }}
            pattern="[+][0-9]{12}"
           className='form-control'
            type="tel"
            id="phone"
            placeholder="+923000000000"
            required
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="cnic">CNIC <span className='text-danger'>*</span></label>
          <input
                 onKeyPress={(event) => {
                  console.log(event.key)
                  if (!/[0-9]/.test(event.key ) && event.key !== '-') {
                    
                    event.preventDefault();
                  }
    
                }}
          pattern="^[0-9]{5}-[0-9]{7}-[0-9]{1}$"
           className='form-control'
            type="tel"
            id="cnic"
            placeholder="00000-0000000-0"
            required
            onChange={(e) => setCnic(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email Address <span className='text-danger'>*</span></label>
          <input
           className='form-control'
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password <span className='text-danger'>*</span></label>
          <input
           className='form-control'
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password <span className='text-danger'>*</span></label>
          <input
           className='form-control'
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="btn btn-primary  select-location btn-for-all" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}