import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const {id} = useParams();
  // console.log(id)
  const  userId = id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  {console.log(isAdmin)}
  return (
    <div className='marginTop  row mt-5 pt-5'>
      <form className="orm-horizontal col-6" onSubmit={submitHandler}>
        <div>
          <h1>Edit User</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className='mt-3'>
              <label htmlFor="name">Name</label>
              <input
              className='form-control'
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className='mt-3'>
              <label htmlFor="email">Email</label>
              <input
              className='form-control'
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className='mt-3'>
            <label  htmlFor='isSeller'>Is Seller </label>
              <input
               class="form-check-input ml-1 "
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
                // style={{display:"inline-block;"}}
              />
             
            </div>

            
            {/* <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              >{console.log("isAdmin",isAdmin,"isSeller",isSeller)}</input>
            </div> */}
            <div className='d-grid gap-2 mt-3'>
              <button type="submit" className="btn btn-primary  ">
                Update
              </button>
            </div>
          </>
        )}
      </form>
      
    </div>
  );
}