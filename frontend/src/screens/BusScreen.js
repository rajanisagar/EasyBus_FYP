import React, { useEffect, useState } from 'react'
import history from '../history';
import Ratting from '../components/Ratting'
import { Link, useNavigate, useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsBuses } from '../actions/busActions';


// Prduction screen
export default function BusScreen(props){
    const navigate  = useNavigate();
    const dispatch  = useDispatch();
    const  {id}  = useParams();
    const [qty,setQty] = useState(1)
    // const { id } = useParams();
    // const bus = data.buses.find((x) => x._id === id);
    const busDetails = useSelector((state) => state.busDetails);
    const {loading, error, bus} = busDetails;
    useEffect(() =>{
        // productid
        dispatch(detailsBuses(id));
    }, [dispatch, id]);
    const bookSeatHandler = () => {
        // cart
        
        navigate(`/bookedSeats/${id }?qty=${qty}`)
    }

    
    return(
        <div>
        {loading? ( 
         <LoadingBox> </LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : ( 
            <div>
            <Link to="/">Back to resutlts</Link>
            <div className='row top'>
                <div className='col-2'>
                    <img className='large' src={bus.image} alt={bus.name}></img>
                </div>
                <div className='col-1'>
                    <ul>
                        <li>
                            <h1>{bus.operator  }</h1>
                        </li>
                        <li>
                            
                            <Ratting ratting={bus.rating} numReviews={bus.numReviews}></Ratting>
                        </li>
                        <li>Price : {bus.price} PKR</li>
                        <li>
                            Description
                            <p>{bus.description}</p>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                Seller <h2><Link to={`/seller/${bus.seller._id}`}>
                                   { bus.seller.seller.name}</Link></h2>
                                    <Ratting rating={bus.seller.seller.rating} numReviews={bus.seller.seller.numReviews}></Ratting>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Price</div>
                                    <div>{bus.price} PKR</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Status</div>
                                    {/* In stock */}
                                    <div>
                                        {bus.seats_remaining>0? (
                                    <span className='success'>Availble</span>
                                    ) : (   
                                    <span className='danger'>Unavailble</span>
                                    )}
                                    </div>
                                </div>
                            </li>
                            {
                                bus.seats_remaining > 0 && (
                                    <>
                                     <li>
                                        <div className='row'>
                                            <div>Qty</div>
                                            <div>
                                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(bus.seats_remaining).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                     </li>
                                     <li>
                                         {/* addtocarthandler */}
                                        <button onClick={bookSeatHandler} className='primary block'> BOOK Seat</button>
                                     </li>
                                    </>

                                )
                            }
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )}

   </div>
       
    );
}