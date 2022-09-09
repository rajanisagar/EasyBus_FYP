import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDiscription, setSellerDiscription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if(user.seller){
        setSellerName(user.seller.name)
        setSellerLogo(user.seller.logo)
        setSellerDiscription(user.seller.discription)
      }
    }
  }, [dispatch, userInfo._id, user ]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password,
        sellerName, sellerLogo, sellerDiscription
      }));
    }
  };
    return(
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant='danger'>{error}</MessageBox>
                    :
                    <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                    {successUpdate && (<MessageBox variant='success'>Profle Updated Successfully</MessageBox>)}
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type={'text'} placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}  ></input>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type={'email'} placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                    </div>
                    <div>
                        <label htmlFor='Password'>Password</label>
                        <input id='Password' type={'password'} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}  ></input>
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input id='confirmPassword' type={'password'} placeholder='Enter Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} ></input>
                    </div>
                    {
                      user.isSeller && (
                        <>
                          <h2>Vendor</h2>
                          <div>
                            <label htmlFor='sellerName'>Company Name</label>
                            <input id='sellerName' type={'text'} placeholder="Enter Seller Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)}></input>
                          </div>
                          <div>
                            <label htmlFor='sellerLogo'>Company Logo</label>
                            <input id='sellerLogo' type={'text'} placeholder="Enter Seller Logo" value={sellerLogo} onChange={(e) => setSellerLogo(e.target.value)}></input>
                          </div>
                          <div>
                            <label htmlFor='sellerDiscription'>Discription</label>
                            <input id='sellerDiscription' type={'text'} placeholder="Enter Seller Discription" value={sellerDiscription} onChange={(e) => setSellerDiscription(e.target.value)}></input>
                          </div>
                        </>
                      )
                    }
                    <div>
                        <label/>
                        <button className='primary' type='submit'>
                            update
                        </button>
                    </div>
                       
                    </>
                }
            </form>
        </div>
    )
}