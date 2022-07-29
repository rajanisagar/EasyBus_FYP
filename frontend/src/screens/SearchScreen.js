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
<form >
    <div className="row ml-5 searchScreenSection ">
    
    <div className="col-3  ">
     
      {/* onChange={(e) => setFrom(e.target.value)} */}
      <select required class="custom-select  select-location ">
      <option  value=""  >Select Departure</option>
      <option value="sukkur">Sukkur</option>
      <option value="lahore"> Lahore </option>

      </select>
     </div>
      <div className="col-3">
     
      {/* onChange={(e) => setTo(e.target.value)} */}
<select required  class="custom-select select-location">
  <option     value="">Select Arrival</option>
  <option value="karachi">Karachi</option>
  <option value="faisalabad">Faisalabad</option>

  </select>
      </div>
      <div className="col-3">
     
      {/* selected={departureDate} onChange={(date) => setDepartureDate(date)} */}
<DatePicker     className="custom-select custom-date"  />

      </div>

      <div className="col-3   ">
      <button type="submit" class="btn btn-primary  seachBtn ">Search</button>

      </div>
    
    </div>
    
    </form>



      <div className=" ml-5 mr-5 row row-f ">
      

     
 
      <aside className="col-md-3  ">
                  
              
                  <div className=" color-white shadow-md rounded p-3 ">
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
                        <li class="custom-control custom-checkbox">
                            <Link
                            className={'all' === category ? 'active' : ''}
                            to={getFilterUrl({ category: 'all' })}
                          >
                            Any
                          </Link>
                          </li>
                          


                          
                           {categories.map((c) => (
                          <li class="custom-control custom-checkbox">
                            <Link key={c}
                              className={c === category ? 'active' : ''}
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
                          <li class="custom-control custom-checkbox">
                            <Link key={p.name}
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
                               <li><a href="#" data-abc="true">Electronics </a></li>
                               <li><a href="#" data-abc="true">Watches  </a></li>
                               <li><a href="#" data-abc="true">Laptops </a></li>
                               <li><a href="#" data-abc="true">Clothes </a></li>
                               <li><a href="#" data-abc="true">Accessories </a></li>
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
              className={`${r.rating}` === `${rating}` ? 'active' : ''}
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




<div className="col-md-9  ">
<div className="  bus-container">
{loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
         




                  <div className="color-white pb-3 pt-3  p-1 m-0 " >
                  <div className="container ">
                    <div
                      className="row align-items-center text-center no-gutters "
                    >
                      <div
                        className="col-md-8 col-sm-6 col-12 text-sm-left p-sm-0 p-3 "
                      >
                       <span className="font-weight-bold "> {buses.length} Buses Found </span>     </div>
     

                     
                      <div className="col-md-4 col-sm-6 col-12">
                        <div className="row no-gutters">
                          <label
                            for="input-sort"
                            className="col-form-label-sm font text-right font-weight-bold text-600 m-2"
                            >Sort By:</label
                          >
                          <select
                            className="border form-control sortByInput   col"       
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

       

          )}

              






<div className="bus-list pt-3 ">



  








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
            
            <div>

    <div
     key = {bus._id}
      className="bus-item  mb-4"
      id="box138402_292"
      onclick="toggleDetails('box138402_292')"
    >
      <div
        className="rounded shadow  row align-items-sm-center flex-row py-2 px-2 no-gutters color-white my-2 my-md-0"
      >
        <div className="col-12 col-md-6">
          <div className="row mb-2 mb-sm-0 no-gutters">
            <div className="col-sm-3 col-3 text-center">
              <img
                alt="FMBT Express"
                src="data:image/jpeg;base64,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"
                className="img-fluid vendor-logo"
              
              />
              <span
                className="text-5 font-weight-900 text-dark d-block 01:15 AM h5 for-font text-uppercase"
                // {bus.operator}
                >{bus.seller.seller.name}</span
              >
            </div>
            <div className="col-sm-9 col-9 pl-3 mt-10">
              <span
                className="text-5 font-weight-bold font-weight-600 d-block text-dark for-font"
                >LHE - RWP </span
              >
              <div className="mt-2">
                <div className="row no-gutters">
                  <div className="col-auto text-1">
                    <span className="text-muted for-font">Type: </span>
                    <span className="font-weight-bold for-font">{bus.bus_type}</span>
                  </div>
                  <div className="col-auto pl-2 text-1">
                    <span className="text-muted for-font">Seats Left: </span>
                    <span className="font-weight-bold for-font">{bus.seats_remaining}</span>
                  </div>
                  <div className="col-auto pl-2 text-1">
                    <span className="text-muted for-font">Rating: </span>
                    <span className="font-weight-bold   for-font"
                      ><i className="fas fa-star text-warning"></i>
                     {bus.rating} </span
                    >
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="row no-gutters bus-facilities">
                  <div className="col">
                    <img
                      src="https://bookme.pk/assets/img/transport_facility/free_wifi.png"
                      alt="Free WiFi"
                      title="Free WiFi"
                      className="img-fluid"
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://bookme.pk/assets/img/transport_facility/mobile_charging.png"
                      alt="Mobile Charging"
                      title="Mobile Charging"
                      className="img-fluid"
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div className="col grayed">
                    <img
                      src="https://bookme.pk/assets/img/transport_facility/Meal_is_served.png"
                      alt="Meal"
                      title="Meal"
                      className="img-fluid"
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://bookme.pk/assets/img/transport_facility/individual_entertainment_system.png"
                      alt="Indiviual Entertainment System"
                      title="Indiviual Entertainment System"
                      className="img-fluid"
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div className="col grayed">
                    <img
                      src="https://bookme.pk/assets/img/transport_facility/toilet_in_bus.png"
                      alt="Toilet In Bus"
                      title="Toilet In Bus"
                      className="img-fluid"
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://bookme.pk/assets/img/transport_facility/regular_seat.png"
                      alt="Regular Seat"
                      title="Regular Seat"
                      className="img-fluid"
                      width="30px"
                      height="30px"
                    />
                  </div>
                  <div className="col grayed">
                    <img
                      src="https://bookme.pk/assets/img/transport_facility/recliner_seat.png"
                      alt="Recliner Seat"
                      title="Recliner Seat"
                      className="img-fluid"
                      width="30px"
                      height="30px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 border-left ">
          <div className="row mt-3 mt-sm-0 no-gutters ml-1">
            <div className="col-sm-9 col-9 ">
              <div className="row no-gutters">
                <div className="col-3 text-center">
                  <p className="font-weight-600 text-muted text-3 ml-2 for-font">
                    01:15 AM
                  </p>
                  <p
                    className="font-weight-600 text-muted text-3 ml-2 pt-sm-3 pt-2 for-font"
                    // style="margin-top: -13px"
                  >
                    06:00 AM
                  </p>
                </div>
                <div className="col-6 timeline border-left ml-5">
                  <div className="text-1 timeline-circle  row">
                    <div className="font-weight-bold d-block ml-3 ml-3 mb-4 col-12 for-font">
                      Lahore
                    </div>
                    <div></div>
                    {/* <div
                      title="Bund Road Lahore"
                      className="col-8 text-truncate for-font"
                    >
                      Bund Road Lahore..
                    </div> */}
                    {/* <div className="col-4 for-font">
                      <a
                        href="https://www.google.com/maps/search/?api=1&amp;query=31.5335122,74.2826173"
                        target="_blank"
                        title="Google map"
                        className="text-3 ml-1 ml-sm-2"
                        ><i
                          className="fas fa-map-marker-alt text-primary"
                        ></i
                      ></a>
                    </div> */}
                  </div>
                  <div className="text-1 timeline-circle row">
                    <div className="font-weight-bold d-block ml-3 col-12 for-font">
                      Rawalpindi
                    </div>
                    {/* <div
                      title="Kainat Trravels &amp; Kohistan Express, Peshawar road"
                      className="col-8 text-truncate for-font"
                    >
                      Kainat Trravels &amp; Kohistan Express,
                      Peshawar road..
                    </div> */}
                    {/* <div className="col-4">
                      <a
                        href="https://www.google.com/maps/search/?api=1&amp;query=33.6134572,72.9966181"
                        target="_blank"
                        title="Google map"
                        className="text-3 ml-1 ml-sm-2"
                        ><i
                          className="fas fa-map-marker-alt text-primary"
                        ></i
                      ></a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-sm-3 col-3 align-self-center text-center"
            >
              <div className="row no-gutters">
                <div className="col-12">
                  <del className="text-success mr-4 text-3 price mb-5 for-font"
                    >RS 1550</del
                  >
                </div>
                <div className="col-12 ">
                  <span className="mr-4 h5 font-weight-bold  price mb-5"
                    >RS {bus.price}</span
                  >
                </div>
                <div className="col-12">
                  <form
                   
                  
                  >
                    {/* <input
                      type="hidden"
                      name="time"
                      value="eyJkZXBhcnR1cmVfY2l0eV9pZCI6MSwiZGVwYXJ0dXJlX2NpdHlfbmFtZSI6IkxhaG9yZSIsImFycml2YWxfY2l0eV9pZCI6MzgsImFycml2YWxfY2l0eV9uYW1lIjoiUmF3YWxwaW5kaSIsInNlcnZpY2VfaWQiOjI5Miwic2VydmljZV9uYW1lIjoiRk1CVCBFeHByZXNzIiwidGltZV9pZCI6MTM4NDAyLCJzY2hlZHVsZV9pZCI6NDQyMTEsInJvdXRlX2lkIjoyOCwidGltZSI6IjAxOjE1IiwiYXJydGltZSI6IjA2OjAwIiwib3JpZ2luYWxfZmFyZSI6MTU1MCwiZmFyZSI6MTMxNywiaGFuZGxpbmdfY2hhcmdlcyI6MCwiZWFzeXBhaXNhX2NoYXJnZXMiOjAsInRodW1iIjoiaHR0cHM6Ly9ib29rbWVway5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9zdGF0aWMvY3VzdG9tL3VwbG9hZC90cmFuc3BvcnQvZm1idC5wbmciLCJzZWF0cyI6NDQsImJ1c25hbWUiOiJMdXh1cnkiLCJidHlwZV9pZCI6NTYsImJ1c3R5cGUiOiJFeGVjdXRpdmUgQ2xhc3MiLCJmYWNpbGl0aWVzIjpbeyJpZCI6IjMiLCJuYW1lIjoiRGlzY291bnQiLCJpbWciOiJodHRwczovL2Jvb2ttZXBrLnMzLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tL3N0YXRpYy9hc3NldHMvaW1nL3RyYW5zcG9ydF9mYWNpbGl0eS9kaXNjb3VudC5wbmcifSx7ImlkIjoiNSIsIm5hbWUiOiJXSUZJIiwiaW1nIjoiaHR0cHM6Ly9ib29rbWVway5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9zdGF0aWMvYXNzZXRzL2ltZy90cmFuc3BvcnRfZmFjaWxpdHkvZnJlZV93aWZpLnBuZyJ9LHsiaWQiOiI2IiwibmFtZSI6IkhlYWRwaG9uZXMiLCJpbWciOiJodHRwczovL2Jvb2ttZXBrLnMzLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tL3N0YXRpYy9hc3NldHMvaW1nL3RyYW5zcG9ydF9mYWNpbGl0eS9oZWFkcGhvbmUucG5nIn0seyJpZCI6IjciLCJuYW1lIjoiVFYiLCJpbWciOiJodHRwczovL2Jvb2ttZXBrLnMzLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tL3N0YXRpYy9hc3NldHMvaW1nL3RyYW5zcG9ydF9mYWNpbGl0eS9pbmRpdmlkdWFsX2VudGVydGFpbm1lbnRfc3lzdGVtLnBuZyJ9LHsiaWQiOiI5IiwibmFtZSI6IkNoYXJnZXIiLCJpbWciOiJodHRwczovL2Jvb2ttZXBrLnMzLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tL3N0YXRpYy9hc3NldHMvaW1nL3RyYW5zcG9ydF9mYWNpbGl0eS9tb2JpbGVfY2hhcmdpbmcucG5nIn0seyJpZCI6IjEyIiwibmFtZSI6IlJlZ3VsYXIgc2VhdCIsImltZyI6Imh0dHBzOi8vYm9va21lcGsuczMuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb20vc3RhdGljL2Fzc2V0cy9pbWcvdHJhbnNwb3J0X2ZhY2lsaXR5L3JlZ3VsYXJfc2VhdC5wbmcifSx7ImlkIjoiMTYiLCJuYW1lIjoiQUMiLCJpbWciOiJodHRwczovL2Jvb2ttZXBrLnMzLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tL3N0YXRpYy9hc3NldHMvaW1nL3RyYW5zcG9ydF9mYWNpbGl0eS9hYy5wbmcifV0sImF2YWlsYWJsZV9zZWF0cyI6MTQsInNlYXRfaW5mbyI6IiIsInJhdGluZyI6My42LCJtYXhfc2VhdHNfc2VsbGVjdGlvbiI6NSwiZGVwYXJ0dXJlX3NsdWciOiJMSEUiLCJhcnJpdmFsX3NsdWciOiJSV1AiLCJkZXBhcnR1cmVfdGVybWluYWxfaWQiOjU4MiwiZGVwX2xhdCI6IjMxLjUzMzUxMjIiLCJkZXBfbGFuIjoiNzQuMjgyNjE3MyIsImRlcF9hZGQiOiJCdW5kIFJvYWQgTGFob3JlIiwiZGVwX3VybCI6bnVsbCwiYXJyaXZhbF90ZXJtaW5hbF9pZCI6NTgzLCJhcnJfbGF0IjoiMzMuNjEzNDU3MiIsImFycl9sYW4iOiI3Mi45OTY2MTgxIiwiYXJyX2FkZCI6IkthaW5hdCBUcnJhdmVscyAmIEtvaGlzdGFuIEV4cHJlc3MsIFBlc2hhd2FyIHJvYWQiLCJhcnJfdXJsIjpudWxsLCJkdXJhdGlvbiI6IjAzIEhvdXJzIDQ1IE1pbnV0ZXMiLCJ0aW1lX3Nsb3QiOiJOaWdodCIsInRpbWVfc2xvdF9pZCI6NCwidG9kYXlfb2ZmZXIiOmZhbHNlLCJjb250YWN0bGVzc29uYm9hcmRpbmciOiJ0cnVlIiwicmVzZXJ2YXRpb25fZXhwaXJ5X3RpbWUiOjkwLCJmbGV4aWZhcmUiOiIxIiwic2VydmljZV9wcmlvcml0eSI6NiwibG95YWx0eV9wb2ludHMiOjEzMSwiZmVtYWxlX3NlYXRzIjo2LCJ2YWNjaW5hdGVkX3NlYXRzIjo5LCJ0YWdzIjpbeyJuYW1lIjoiRmVtYWxlIiwiZGVzY3JpcHRpb24iOiJGZW1hbGUgRnJpZW5kbHkgQnVzIiwiY29sb3IiOiIjNGYyYmMwIn0seyJuYW1lIjoiVmFjY2luYXRlZCIsImRlc2NyaXB0aW9uIjoiVmFjY2luYXRlZCIsImNvbG9yIjoiI2E3MmJjMCJ9XSwic3RvcHMiOltdLCJtZW1iZXJzaGlwIjpudWxsfQ=="
                    />
                    <input
                      type="hidden"
                      name="service_id"
                      value="292"
                    />
                    <input
                      type="hidden"
                      name="origin_city_id"
                      value="1"
                    />
                    <input
                      type="hidden"
                      name="arrival_city_id"
                      value="38"
                    />
                    <input
                      type="hidden"
                      name="deptime"
                      value="01:15"
                    />
                    <input
                      type="hidden"
                      name="time_id"
                      value="138402"
                    />
                    <input
                      type="hidden"
                      name="schedule_id"
                      value="44211"
                    />
                    <input
                      type="hidden"
                      name="route_id"
                      value="28"
                    />
                    <input
                      type="hidden"
                      name="seats"
                      value="44"
                    />
                    <input
                      type="hidden"
                      name="date"
                      value="2022-07-13"
                    />
                    <input
                      type="hidden"
                      name="return_turn"
                      value="0"
                    /> */}
                    <button
                      type="submit"
                      className="btn btn btn-primary bookBtn"
                    >
                      BOOK
                    </button>

                    <Link to={`/bus/${bus._id}`}></Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




    </div >

      
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







