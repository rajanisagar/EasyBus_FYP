import React from 'react'
import { Link } from 'react-router-dom'
import Ratting from './Ratting'

 {/* <!--Product--> */}
export default function Bus(props){
   
    const {bus} = props
    // console.log(bus._id)
    return(
        <div>
    <div key = {bus._id} className="card">
        {/* <!-- product --> */}
        <Link to={`/bus/${bus._id}`}>
        {/* <!-- image size :680px by 830px; --> */}
            <img className="medium" src="./images/p1.jpg" alt={bus.operator}/>
        </Link>
        <div className="card-body">
                {/* <!-- product --> */}
                <Link to={`/bus/${bus._id}`}>
                    {/* operator == name */}
                <h2>{bus.operator}</h2>
                </Link>
                <Ratting 
                rating = {bus.rating} 
                numReviews = {bus.numReviews}>
                </Ratting>

            <div className='row'>
              <div className="price"> {bus.price+ " PKR"}</div>
              <div>
              <Link to={`/seller/${bus.seller._id}`}>
                
              {bus.seller.seller.name}</Link>
              </div>
            </div>
          
        </div>
</div>
</div >
    )
}       
    