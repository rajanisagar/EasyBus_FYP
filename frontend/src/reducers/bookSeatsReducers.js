import { BOOKSEATS_EMPTY, BOOKSEATS_SHIPPING_ADDRES, BOOK_SEAT, REMOVE_SEAT, SAVE_PAYMENT_METHOD } from "../constants/BookSeatsConstants";

// bookedSeats === cartItem
// bookSeatsReducer cartReducer
export const bookSeatsReducer = (state = {bookedSeats:[]}, action) =>{
    switch(action.type){
        case BOOK_SEAT:
            // seat =>> item
            const seat = action.payload;
            const existSeat = state.bookedSeats.find(x => x.id === seat.id);
            if(existSeat){
                return {
                    ...state,
                    bookedSeats: state.bookedSeats.map( x => x.id === existSeat.id? seat: x)
                }
            }else{
                return { ...state, bookedSeats: [...state.bookedSeats, seat] }
             } 
        case REMOVE_SEAT:
            return {...state, bookedSeats: state.bookedSeats.filter( x => x.id !== action.payload)} 
       // BOOKSEATS_SHIPPING_ADDRES  === CART_SAVE_SHIPPING_ADDRESS
        case BOOKSEATS_SHIPPING_ADDRES:
            return { ...state, shippingAddress: action.payload };
        case SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        case BOOKSEATS_EMPTY:
            return { ...state, bookedSeats: []};
        default:
            return state;
    }
}