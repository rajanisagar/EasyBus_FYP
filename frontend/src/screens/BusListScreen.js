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
    <div>
      <div className="row">
        <h1>Buses</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Bus
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus._id}</td>
                <td>{bus.operator}</td>
                <td>{bus.price}</td>
                <td>{bus.bus_type}</td>
                <td>{bus.operator}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      navigate(`/bus/${bus._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
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