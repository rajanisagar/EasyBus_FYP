import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import  {bookSeat, removeFromBookedSeats} from '../actions/bookSeatsActions'
import MessageBox from '../components/MessageBox';
export default function BookedSeatsScreen(props) {

    const { id } = useParams();
    const { search } = useLocation();
    const [searchParms] = useSearchParams();
  

    const qty = search ? Number(search.split("=")[1]) : 1;
    //cart ===bookSeats
    const bookSeats = useSelector(state => state.bookSeats)
    //bookedSeats ===cartIems  
    const {bookedSeats} = bookSeats
    const  navigate = useNavigate();
    // console.log({ id, qty, qtyParam: Number(searchParms.get("qty")) });
    const dispatch = useDispatch();
    useEffect(() =>{
        if(id) {
            dispatch(bookSeat(id, qty))
        }
    }, [dispatch, id, qty])
    const removeFromBookedSeatsHandler = (id) => {
        dispatch(removeFromBookedSeats(id));
    }
    const checkOutHandler = (id) => {
        //
         navigate('/signin?redirect=/shipping')
    }
    
    return (
      <div className='row top'>
            <div className='col-2'>
                <h1>Booked Seats</h1>
                {
                    bookedSeats.length === 0 ?<MessageBox>
                         No seat booked empty. <Link to={"/"}>Go to Home</Link>
                    </MessageBox>
                    :
                    (
                        <ul>
                            {
                                bookedSeats.map((item) => (
                                    <li key={item.bus}>
                                        <div className='row'>
                                            <div>
                                                <img src={item.image} alt={item.operator} className="small"></img>
                                            </div>
                                            <div className='min-30'>
                                                <Link to={`/bus/${item.bus}`}>{item.name}{console.log(item.price)}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={e => dispatch(bookSeat(item.bus ,Number(e.target.value))  )}>
                                                {
                                                        [...Array(item.seats_remaining).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </select> 
                                            </div>
                                            <div>
                                                PKR {item.price}
                                            </div>
                                            <div>
                                                <button type='button' onClick={() => 
                                                    removeFromBookedSeatsHandler(item.bus)}>
                                                     Delete
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    ))
                            }
                           
                        </ul>
                    )


                }

            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <h2>
                                {/* seats === items */}
                                Subtotal ({bookedSeats.reduce((a, c) => a + c.qty, 0)} Seats) : ${bookedSeats.reduce((a, c) => a + c.price * c.qty, 0)  } 
                            </h2>
                        </li>
                        <li>
                            <button type='button' onClick={checkOutHandler} className={"primary block"} disabled={bookedSeats.length === 0}> 
                            Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
      </div>
    );
}

