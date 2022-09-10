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
        // if(id) {
        //     dispatch(bookSeat(id, qty))
        // }
    }, [])
    const removeFromBookedSeatsHandler = (id) => {
        dispatch(removeFromBookedSeats(id));
    }
    const checkOutHandler = (id) => {
        //
         navigate('/signin?redirect=/userDetails')
    }

    return (
        <div className='marginTop container'>
      <div className='row  '>
            <div className='col-6'>
                <h1>Booked Seats</h1>
                {
                    bookedSeats.length === 0 ?<MessageBox>
                         No seat booked empty. <Link to={"/"}>Go to Home</Link>
                    </MessageBox>
                    :
                    (

                        <table className="table">
                        <thead>
                          <tr>
                             <th>Seat Number</th>
                             <th>PRICE</th>
                            <th>Bus Vendor</th>
                            {/* <th>Bus Type</th> */}
                            <th>From</th>
                            <th>To</th>
                            <th>Departure Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                            {  
                                bookedSeats.map((item) => (
  
                                    <tr key={item.id}>
                                        
                                            <td>{item.seatId}</td>
                                            <td>{item.price}</td>
                                            <td>{item.seller.seller.name}</td>
                                            {/* <td>{item.busType}</td> */}
                                            <td>{item.from}</td>
                                            <td>{item.to}</td>
                                            <td>{item.departureDate}</td>
                                            <td>
                                                <button className='btn btn btn-danger btn-sm' type='button' onClick={() => 
                                                    removeFromBookedSeatsHandler(item.id)}>
                                                     Delete
                                                </button>
                                            </td>
                                       
                                    </tr>
                                    ))
                            }
                           
                        </tbody>
                        </table>

                    )


                }

            </div>
            
            <div className='col-5 mt-5'>
                <div className='card card-body'>
                    <ul >
                        <li>
                            <h2>
                                {/* seats === items */}
                                Subtotal ({bookedSeats.reduce((a, c) => a + 1, 0)} Seats) : {bookedSeats.reduce((a, c) => a + c.price * 1, 0)  }.0 
                            </h2>
                        </li>
                        <li>
                            <button type='button' onClick={checkOutHandler} className={"btn btn-primary btn-sm  btn-for-all"} disabled={bookedSeats.length === 0}> 
                            Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
      </div>
        </div>
      
    );
}

