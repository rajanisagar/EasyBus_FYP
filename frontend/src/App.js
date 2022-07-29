import {BrowserRouter, Link, Route,Routes} from 'react-router-dom';
import BusScreen from './screens/BusScreen';
import HomeScreen from './screens/HomeScreen';
import BookedSeatsScreen from './screens/BookedSeatsScreen';
import history from './history';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/orderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import SellerRoute from './components/SellerRoute';
import BusListScreen from './screens/BusListScreen';
import BusEditScreen from './screens/BusEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerScreen from './screens/SellerScreen';
// import SearchBox from './components/Search';
import SearchScreen from './screens/SearchScreen';
import { useEffect } from 'react';
import { listBusCategories } from './actions/busActions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() { 


    // bookSeats = cart
  const bookSeats = useSelector(state => state.bookSeats)
  const {bookedSeats} = bookSeats;
  const userSignin = useSelector((state) => state.userSignin)
  const  {userInfo} = userSignin 
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout())
  }

  useEffect(() => {
    dispatch(listBusCategories())
  },[dispatch])
  return (
    <BrowserRouter  history={history}>
    <div className="grid-container">
    <Navbar />
 
    {/* <aside className={sidebarIsOpen ? 'open' : ''} >
            <ul>

            </ul>
    </aside> */}
    <main>
    
       
        <Routes>
            <Route path="/seller/:id" element={<SellerScreen/>} ></Route>
            <Route path="/bookedSeats/:id" element={<BookedSeatsScreen/>} ></Route>
            <Route path="/bookedSeats" element={<BookedSeatsScreen/>} ></Route>
            <Route path="/bus/:id" element={<BusScreen/>} exact></Route>
            <Route path="/bus/:id/edit" element={<BusEditScreen/>} exact></Route>
            <Route path="/bus" element={<BusScreen/>} exact></Route>

            <Route path='/signin' element={<SigninScreen></SigninScreen>}></Route>
            <Route path='/register' element={<RegisterScreen></RegisterScreen>}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen></ShippingAddressScreen>}></Route>
            <Route path="/payment" element={<PaymentMethodScreen></PaymentMethodScreen>}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen></PlaceOrderScreen>}></Route>
            <Route path="/order/:id" element={<OrderScreen></OrderScreen>}></Route>
            <Route path="/orderhistory" element={<OrderHistoryScreen></OrderHistoryScreen>}></Route>
            {/* <Route exact path="/search/name/:name"  element={<SearchScreen></SearchScreen>} ></Route>
            <Route exact path="/search/name/"  element={<SearchScreen></SearchScreen>} ></Route>
             */}
            <Route exact path="/search/from/:from/to/:to/departureDate/:departureDate"  element={<SearchScreen></SearchScreen>} ></Route>

            <Route exact path="/search/category/:category"  element={<SearchScreen></SearchScreen>} ></Route>
            {/* <Route exact path="/search/category/:category/name/:name"  element={<SearchScreen></SearchScreen>} ></Route> */}
            {/* <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
            element={<SearchScreen></SearchScreen>}
            exact
          ></Route> */}
                     
                     
                                 <Route
            path="/search/from/:from/to/:to/departureDate/:departureDate/category/:category/min/:min/max/:max/rating/:rating/order/:order"
            element={<SearchScreen></SearchScreen>}
            exact
          ></Route>

            <Route exact path='/profile' element={<PrivateRoute/>}>
                <Route exact path='/profile' element={<ProfileScreen/>}/>
            </Route>
            <Route exact path='/buslist' element={<AdminRoute/>}>
                <Route exact path='/buslist' element={<BusListScreen/>}/>
            </Route>
            <Route exact path='/orderlist' element={<AdminRoute/>}>
                <Route exact path='/orderlist' element={<OrderListScreen/>}/>
            </Route>
            <Route exact path='/userlist' element={<AdminRoute/>}>
                <Route exact path='/userlist' element={<UserListScreen/>}/>
            </Route>
            <Route exact path='/user/:id/edit' element={<AdminRoute/>}>
                <Route exact path='/user/:id/edit' element={<UserEditScreen/>}/>
            </Route>
            <Route  path='/buslist/seller' element={<SellerRoute/>}>
                <Route  path='/buslist/seller' element={<BusListScreen/>}/>
            </Route>
            <Route  path='/orderlist/seller' element={<SellerRoute/>}>
                <Route path='/orderlist/seller' element={<OrderListScreen/>}/>
            </Route>
            <Route path={"/"} element={<HomeScreen/>} ></Route>
            
        </Routes>
    
    </main>
    
    {/* <Footer /> */}
</div>
</BrowserRouter>
  );
}

export default App;
