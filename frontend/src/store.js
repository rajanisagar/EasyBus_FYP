import data from './data';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {  busCategoryListReducer, busCreateReducer, busDeleteReducer, busDetailsReducer, busListReducer, busReviewCreateReducer, busUpdateReducer } from './reducers/busReducers';
import { bookSeatsReducer } from './reducers/bookSeatsReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderMineListReducer } from './reducers/orderReducer';


const initialState = {
    userSignin: {
      userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    bookSeats: {
        bookedSeats: localStorage.getItem('bookedSeats')
          ? JSON.parse(localStorage.getItem('bookedSeats'))
          : [],
          shippingAddress: localStorage.getItem('shippingAddress')
          ? JSON.parse(localStorage.getItem('shippingAddress'))
          : {},
          paymentMethod: 'PayPal',
      },
};
const reducer = combineReducers({
    buseList: busListReducer,
    busDetails: busDetailsReducer,
    // bookSeats ===  cart
    bookSeats: bookSeatsReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    busCreate: busCreateReducer,
    busUpdate: busUpdateReducer,
    busDelete: busDeleteReducer,
    orderList:orderListReducer,
    orderDelete: orderDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    busCategoryList: busCategoryListReducer,
    busReviewCreate: busReviewCreateReducer,
    
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;