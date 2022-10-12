import React from 'react'

export default function Ratting(props){
    const  {rating, numReviews, caption} = props; 
    return(
        <div className="ratting">
            <span>
                <i
                    className={
                    rating >= 1 
                        ? "fa fa-star text-warning" 
                        : rating >= 0.5 
                        ?'fa fa-star-half-o text-warning' 
                        :'fa fa-star-o text-warning' 
                    }
                ></i>
            </span>
            <span>
            <i
                className={
                    rating >= 2
                        ? "fa fa-star text-warning" 
                        : rating >= 1.5 
                        ?'fa fa-star-half-o text-warning' 
                        :'fa fa-star-o text-warning' 
                    }
                ></i>
            </span>
            <span>
            <i
                className={
                    rating >= 3
                        ? "fa fa-star text-warning" 
                        : rating >= 2.5 
                        ?'fa fa-star-half-o text-warning' 
                        :'fa fa-star-o text-warning' 
                    }
                ></i>
            </span>
            <span>
            <i
                className={
                    rating >= 4 
                        ? "fa fa-star text-warning" 
                        : rating >= 3.5 
                        ?'fa fa-star-half-o text-warning' 
                        :'fa fa-star-o text-warning' 
                    }
                ></i>
            </span>
            <span>
            <i
                className={
                    rating >= 5
                        ? "fa fa-star text-warning" 
                        : rating >= 4.5 
                        ?'fa fa-star-half-o text-warning' 
                        :'fa fa-star-o text-warning' 
                    }
                ></i>
            </span>
            {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{numReviews + ' reviews'}</span>
      )}
            
      </div>
    )
}