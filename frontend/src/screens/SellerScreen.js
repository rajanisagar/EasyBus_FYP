import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listBuses } from '../actions/busActions'
import { detailsUser } from '../actions/userActions'
import Bus from '../components/Bus'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Ratting from '../components/Ratting'
 export default function SellerScreen (){
    const {id} = useParams()
    const sellerId =id;
    console.log(id)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails;

    const buseList = useSelector(state => state.buseList)
    const {loading: loadingBuses, error: errorBuses, buses} = buseList

    useEffect(() => {
        dispatch(detailsUser(sellerId))
        dispatch(listBuses({seller: sellerId}))
    },[dispatch, sellerId])
    return(
        <div className='row top'>
            <div className='col-1'>
                {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant='danger'>{error}</MessageBox>
                :
                (
                    <ul className='card card-body'>
                        <li>
                            <div className='row start'>
                                <div className='p-1'> 
                                    <img src={user.seller.logo} alt={user.seller.name}></img>
                                </div>
                                <div className='p-1'>
                                <h1>
                                    {user.seller.name}
                                </h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Ratting ratting={user.seller.rating} numReviews={user.seller.numReviews}></Ratting>
                        </li>
                        <li>
                            <a href={`mailto: ${user.email}`}>Contact Seller</a>
                        </li>
                        <li>
                             {user.seller.discription}
                        </li>
                    </ul>
                )    
            }
            </div>
            <div className='col-3'>
            {loadingBuses ? <LoadingBox></LoadingBox>
                :
                errorBuses ? <MessageBox variant='danger'>{errorBuses}</MessageBox>
                :
                (
                    <>
                   {buses.length === 0 &&(<MessageBox>No Bus Found</MessageBox>) }
                   <div className='row center'>
                   {buses.map(bus => 
                    (
                        <Bus key={bus._id} bus={bus}></Bus>
                    ))}
                   </div>
                    </>
                )}
            </div>
        </div>
    )
 }