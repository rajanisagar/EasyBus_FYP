
import Axios from 'axios';
import { BOOK_SEAT, REMOVE_SEAT, BOOKSEATS_SHIPPING_ADDRES, SAVE_PAYMENT_METHOD  } from "../constants/BookSeatsConstants"
// bookSeat === addToCart
export const bookSeat = (Id, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/buses/${Id}`);
  dispatch({
    type: BOOK_SEAT,
    payload: {
        name: data.operator,
        image: data.image,
        price: data.price,
        seats_remaining: data.seats_remaining,
        bus: data._id,
        seller: data.seller,
        qty,
    },
  });
//   bookedSeats == cartItems
localStorage.setItem('bookedSeats', JSON.stringify(getState().bookSeats.bookedSeats));
};
export const removeFromBookedSeats = (Id) => (dispatch, getState) => {
    dispatch({type: REMOVE_SEAT,  payload: Id})
    localStorage.setItem('bookedSeats', JSON.stringify(getState().bookSeats.bookedSeats)); 
}


export const saveShippingAddress = (data) => (dispatch) => {
  // BOOKSEATS_SHIPPING_ADDRES  === CART_SAVE_SHIPPING_ADDRESS
  dispatch({ type: BOOKSEATS_SHIPPING_ADDRES, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
};