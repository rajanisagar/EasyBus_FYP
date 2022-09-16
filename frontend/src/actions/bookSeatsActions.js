
import Axios from 'axios';
import { BOOK_SEAT, REMOVE_SEAT, BOOKSEATS_SHIPPING_ADDRES, SAVE_PAYMENT_METHOD  } from "../constants/BookSeatsConstants"
// bookSeat === addToCart
export const bookSeat = (Id, seat  ) => async (dispatch, getState) => {
  
  const { data } = await Axios.get(`/api/buses/${Id}`);
  seat.map((s) => {
    dispatch({
      type: BOOK_SEAT,
      payload: {
  
  
          seatId: s.seatId,
          price: data.price,
          image: data.image,
          seller: data.seller,
          busType: data.bus_type,
          from: data.from,
          to: data.to,
          departureDate: data.departureDate,
          seats_remaining: data.seats_remaining,
          bus: data._id,
          id: s.uid,
        
          // id: data.seats.find(x => x._id === '45')._id,
          // seats: data.seats
      },
    });
  //   bookedSeats == cartItems
  localStorage.setItem('bookedSeats', JSON.stringify(getState().bookSeats.bookedSeats));

  })
  
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