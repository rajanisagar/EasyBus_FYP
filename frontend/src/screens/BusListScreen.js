import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation, useMatch, useNavigate, useParams  } from 'react-router-dom';
import { createBus, deleteBus, listBuses } from '../actions/busActions';


import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BUS_CREATE_RESET, BUS_DELETE_RESET } from '../constants/busConstants';


export default function BusListScreen(props) {
  // const sellerMode = props.match.path.indexOf('/seller') >=0 ;
 
 
  let sellerMode = false;
  const { pathname } = useLocation();
  if(pathname == '/buslist/seller'){
    sellerMode = true;
  }
  
 




  
 const navigate = useNavigate()
  const buseList = useSelector((state) => state.buseList);
  const { loading, error, buses } = buseList;

  const busCreate = useSelector((state) => state.busCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    bus: createdBus,
  } = busCreate;
  
  

  const busDelete  = useSelector(state => state.busDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = busDelete
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: BUS_CREATE_RESET });
      navigate(`/bus/${createdBus._id}/edit`);
    }
    if(successDelete ) {
      dispatch({type:BUS_DELETE_RESET})
    }
    dispatch(listBuses({seller: sellerMode ? userInfo._id: ''}));
  }, [createdBus, dispatch, navigate, successCreate, successDelete, sellerMode, userInfo._id]);

  const deleteHandler = (bus) => {
    if(window.confirm('Are You Sure to delete')){
      dispatch(deleteBus(bus._id))
    }
   
  };
  const createHandler = () => {
    
    dispatch(createBus());
  };
  return (
    <div className='marginTop container '>
      {/* <div className="row "> */}
        <h1 className='d-inline'>Buses</h1>
        <button type="button" className="create-bus-btn d-inline  btn btn btn-primary btn-md" onClick={createHandler}>
          Create Bus
        </button>
      
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table container mt-3">
          <thead>
            <tr>
            <th>Bus ID</th>
              <th>From</th>
              <th>To</th>
              <th>Departure Date</th>
              <th>Bus Type</th>
              <th>PRICE</th>
              <th>Seats Remaining</th>
              <th>Bus Ratings</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.ID}</td>
                <td>{bus.from}</td>
                <td>{bus.to}</td>
                <td>{bus.departureDate}</td>
                <td>{bus.bus_type}</td>
                <td>{bus.price}</td>
                <td>{bus.seats_remaining}</td>
                <td>{bus.rating}</td>
                
               
                <td>
                  <button
                    type="button"
                    className=" btn btn btn-primary btn-md"
                    onClick={() =>
                      navigate(`/bus/${bus._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className=" btn btn btn-danger btn-md ml-1"
                  
                    onClick={() => deleteHandler(bus)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}