import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listBuses } from '../actions/busActions';
import styled from 'styled-components';
import Bus from '../components/Bus';
import DatePicker from "react-datepicker";

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import Ratting from '../components/Ratting';
import { prices, ratings } from '../utils';
import Search from '../components/Search';


export default function SearchScreen(props) {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    from = '',
    to = '',
    departureDate = ''
  } = useParams();


//search from the search screen

  const [from_s, setFrom] = useState('');
  const [to_s, setTo] = useState('');
  let [departureDate_s, setDepartureDate] = useState(new Date());

  const changeTheDate =  function(d){
    return (d.getMonth() + 1) + 
    "-" +  d.getDate() +
    "-" +  d.getFullYear();
} 

    const submitHandler = (e) => {
      departureDate_s = changeTheDate(departureDate_s);
      e.preventDefault();
      navigate(`/search/from/${from_s}/to/${to_s}/departureDate/${departureDate_s}`);
    };
  


    

  // console.log(departureDate)

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const buseList   = useSelector((state) => state.buseList  );
  const { loading, error, buses  } = buseList ;

 

  const busCategoryList  = useSelector((state) => state.busCategoryList );
  const { loading: loadingCategories, error: errorCategories, categories } = busCategoryList ;
  useEffect(() => {
    dispatch(
        listBuses({
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
        from,
        to,
        departureDate
      })
    );
  }, [category, dispatch, max, min, name, order, rating,from,to,departureDate]);

 




  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterFrom = filter.from || from;
    const filterTo = filter.to || to;
    const filterDepartureDate = filter.departureDate || departureDate;

    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
   
    return `/search/from/${filterFrom}/to/${filterTo}/departureDate/${filterDepartureDate}/category/${filterCategory}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };
  return (
    
    <div className='container-fluid search-screcn-body'>


   
             
{/* <form onSubmit={submitHandler}> */}
<form onSubmit={submitHandler}>
    <div className="row ml-4 mt-3 searchScreenSection ">
    
    <div className="col-3 ">
     
      {/* onChange={(e) => setFrom(e.target.value)} */}
      <select onChange={(e) => setFrom(e.target.value)}  required className="custom-select    ">
      <option  value=""  >Select Departure</option>
      <option value="sukkur">Sukkur</option>
      <option value="lahore"> Lahore </option>

      </select>
     </div>
      <div className="col-3 ">
     
      {/* onChange={(e) => setTo(e.target.value)} */}
<select onChange={(e) => setTo(e.target.value)}  required  class="custom-select select-location ">
  <option     value="">Select Arrival</option>
  <option value="karachi">Karachi</option>
  <option value="faisalabad">Faisalabad</option>

  </select>
      </div>
      <div className="col-3">
     
      {/* selected={departureDate} onChange={(date) => setDepartureDate(date)} */}
<DatePicker   selected={departureDate_s} onChange={(date) => setDepartureDate(date)}  className="custom-select custom-date"  />

      </div>

      <div className="col-3">
      <button type="submit" className="btn btn-primary btn-lg searchBtn">Search</button>

      </div>
    
    </div>
    
    </form>



      <div className=" ml-5 mr-5 row row-f ">
      

     
 
      <aside className="col-md-3 p-1    aside-filter ">
                  
            
                  <div className=" color-white shadow-md rounded  px-2">
                    <div className='filer-header-text h3'><span >Filter</span></div>
               <article className=" filter-group ">
                   <header className="card-header color-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside1" data-abc="true" aria-expanded="false" className="collapsed">
                       <h5 className='text-dark category-name'>Bus Type&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
            
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside1" >
                       <div className="ml-3 card-body  border-bottom ">
                       <ul className="list-menu ">
                        <li className="custom-control custom-checkbox">
                            <Link
                            className={'all' === category ? 'font-weight-bolder' : ''}
                            to={getFilterUrl({ category: 'all' })}
                          >
                             Any
                          </Link>
                          </li>
                       


                          
                           {categories && categories.map((c) => (
                          <li className="custom-control custom-checkbox">
                            <Link key={c}
                              className={c === category ? 'font-weight-bolder' : ''}
                              to={getFilterUrl({ category: c })}
                            >
                              {c}
                            </Link>
                            </li>
                        ))}
                              
                           </ul>
           
                       </div> 
                   </div>
               </article> 
               <article className=" filter-group">
                   <header className="card-header color-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside2" data-abc="true" aria-expanded="false" className="collapsed">
                       <h5 className='text-dark category-name'>Price&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside2" >
                       <div className="ml-3 card-body  border-bottom ">
                          
   

                           <ul className="list-menu ">
                           {prices.map((p) => (
                          <li className="custom-control custom-checkbox">
                            <Link key={p.name}
                             to={getFilterUrl({ min: p.min, max: p.max })}
                             className={
                              `${p.min}-${p.max}` === `${min}-${max}` ? 'font-weight-bolder' : ''
                            }
                            >
                            {p.name}
                            </Link>
                            </li>
                        ))}
                           </ul>
           
                       </div> 
                   </div>
               </article> 
               <article className=" filter-group">
                   <header className="card-header color-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside3" data-abc="true" aria-expanded="false" className="collapsed">
                       <h5 className='text-dark category-name'>Bus Company&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside3" >
                       <div className="ml-3 card-body  border-bottom ">
                          
                           <ul className="list-menu ">
                               {/* <li><a href="#" data-abc="true">Electronics </a></li>
                               <li><a href="#" data-abc="true">Watches  </a></li>
                               <li><a href="#" data-abc="true">Laptops </a></li>
                               <li><a href="#" data-abc="true">Clothes </a></li>
                               <li><a href="#" data-abc="true">Accessories </a></li> */}
                           </ul>
           
                       </div> 
                   </div>
               </article> 
               <article className=" filter-group">
                   <header className="card-header color-white">
                       <a href="#" data-toggle="collapse" data-target="#collapse_aside4" data-abc="true" aria-expanded="false" className="collapsed">
                       <h5 className='text-dark category-name'>Reviews&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; <i className="  icon-control fa fa-chevron-down down-icon justify-content-end"></i> </h5>
                       </a>
                   </header>
                   <div className=" border-bottom filter-content collapse" id="collapse_aside4" >
                       <div className="ml-3 card-body  border-bottom ">
                      
       
                           <ul className="list-menu">
                           {ratings.map((r) => (
          <li key={r.name}>
            <Link
              to={getFilterUrl({ rating: r.rating })}
              className={`${r.rating}` === `${rating}` ? 'font-weight-bolder' : ''}
            >
              <Ratting caption={' & up'} rating={r.rating}></Ratting>
            </Link>
          </li>
        ))}
                           </ul>
           
                       </div> 
                   </div>
               </article>
           </div>
           
           </aside>
                      
                




        
        {/* <div className="col-3">
          <h3>Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Ratting caption={' & up'} rating={r.rating}></Ratting>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div> */}




<div className="col-md-9 ">
<div className=" ">
{loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
         

<div className="color-white p-2 mt-1 rounded ml-2">
<div className="font-weight-bold d-inline  "> {buses.length} Buses Found </div>
<div className='d-inline searchBar '> <label
                            for="input-sort"
                            className=" col-form-label-sm font text-right font-weight-bold text-600  "
                            >Sort By: &nbsp;
                              </label>
                              <select
                            className="border custom-select  col-3 "       
                            value={order}
                            onChange={(e) => {
                              navigate(getFilterUrl({ order: e.target.value }));
                            }}
                          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
                          </select>
</div></div> 

       

          )}

              






<div className="bus-list ">



  








    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <>
    {buses.length === 0 && (
          <MessageBox>No Bus Found</MessageBox>
        )}
        <div >
          {buses.map((bus) => (
            <div class="card mt-3"  key = {bus._id}>
  <h5 class="card-header">{bus.seller.seller.name}</h5>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
))}


</div>









    </>
    )}
  












</div>
</div>
</div>

      </div>
    </div>
  );
}







