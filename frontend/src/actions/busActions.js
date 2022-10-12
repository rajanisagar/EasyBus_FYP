// this was Axios not axios
import Axios from "axios";
import { BUS_CATEGORY_LIST_FAIL, BUS_CATEGORY_LIST_REQUEST, BUS_CATEGORY_LIST_SUCCESS, BUS_CREATE_FAIL, BUS_CREATE_REQUEST, BUS_CREATE_SUCCESS, BUS_DELETE_FAIL, BUS_DELETE_REQUEST, BUS_DELETE_SUCCESS, BUS_DETAILS_FAIL, BUS_DETAILS_REQUEST, BUS_DETAILS_SUCCESS, BUS_LIST_FAIL, BUS_LIST_REQUEST, BUS_LIST_SUCCESS, BUS_REVIEW_CREATE_FAIL, BUS_REVIEW_CREATE_REQUEST, BUS_REVIEW_CREATE_SUCCESS, BUS_UPDATE_FAIL, BUS_UPDATE_REQUEST, BUS_UPDATE_SUCCESS } from "../constants/busConstants"

export const listBuses = ({
  seller = '',
  name = '',
  category = '',
  order = '',
  min = 0,
  max = 0,
  rating = 0,
  from = '',
  to = '',
  departureDate = '',

}) => async (dispatch) => {
  // console.log(category)
  dispatch({
        type: BUS_LIST_REQUEST
    });
    try{
       
        const { data } = await Axios.get(`/api/buses?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}&from=${from}&to=${to}&departureDate=${departureDate}`)
        dispatch({type: BUS_LIST_SUCCESS, payload: data })
        
    } catch(error) {
        dispatch({type: BUS_LIST_FAIL, payload: error.message })
    }
}
export const listBusCategories = () => async (dispatch) => {
  dispatch({
      type: BUS_CATEGORY_LIST_REQUEST
  });
  try{
      const { data } = await Axios.get(`/api/buses/categories`)
     
      dispatch({type: BUS_CATEGORY_LIST_SUCCESS, payload: data })
  } catch(error) {
      dispatch({type: BUS_CATEGORY_LIST_FAIL, payload: error.message })
      

  }
}

export const detailsBuses = (busId) => async (dispatch) => {
    dispatch({type: BUS_DETAILS_REQUEST, payload: busId })
    try{
      
        const {data} = await Axios.get(`/api/buses/${busId}`)
        // console.log(data)
        dispatch({type: BUS_DETAILS_SUCCESS, payload: data })
    } catch(error){ 
        dispatch({
            type: BUS_DETAILS_FAIL, 
            payload:
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message, 
     })
    }
}
  export const createBus = () => async (dispatch, getState) => {
    dispatch({ type: BUS_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      
      const { data } = await Axios.post(
        '/api/buses',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: BUS_CREATE_SUCCESS,
        payload: data.bus,
      });
      console.log(data)
    } catch (error) {
      
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BUS_CREATE_FAIL, payload: message });
    }
  };

export const updateBus = (bus) => async(dispatch, getState) => {
  dispatch({
     type: BUS_UPDATE_REQUEST, payload: bus

  })

  

  const {userSignin:{userInfo}} = getState();
  try{
   
    const {data} = await Axios.put(`/api/buses/${bus._id}`, bus, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    })
       
    dispatch({type:BUS_UPDATE_SUCCESS, payload: data.bus})
    
  } catch(error){
    const message =  error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({type: BUS_UPDATE_FAIL, error: message})
   
  }
}
export const createReview = (busId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: BUS_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/buses/${busId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: BUS_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BUS_REVIEW_CREATE_FAIL, payload: message });
  }
};

export const deleteBus = (busId) => (dispatch, getState) => {
  dispatch({type: BUS_DELETE_REQUEST, payload: busId})
  const {userSignin: {userInfo}} = getState()
  try{
    const {data} = Axios.delete(`/api/buses/${busId}`, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    })
    dispatch({type: BUS_DELETE_SUCCESS})
  } 
  catch(error){
    const message =  error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({type: BUS_DELETE_FAIL, payload: message})
  }
}