<div className="search">
<form onSubmit={submitHandler}>
  <div className="container">
    <label htmlFor="">Where you want to go</label>
    <select required onChange={(e) => setFrom(e.target.value)} class="custom-select  select-location ">
    <option  value="" >Select Departure</option>
    <option value="sukkur">Sukkur</option>
    <option value="lahore"> Lahore </option>

    </select>
  </div>
  <div className="container">
    <label htmlFor="">Check-in</label>
    <select required onChange={(e) => setTo(e.target.value)} class="custom-select select-location">
      <option     value="">Select Arrival</option>
      <option value="karachi">Karachi</option>
      <option value="faisalabad">Faisalabad</option>

      </select>
  </div>
  <div className="container">
    <label htmlFor="">Check-out</label>
    <DatePicker  selected={departureDate} onChange={(date) => setDepartureDate(date)} />

  </div>
  <button type="submit" class="btn btn-primary btn-lg select-location btn-for-all">Search</button>

  </form>
</div>




        <div>





        <div className='parent-dev'>
     



        <div class="location-form bg-light shadow-lg  py-5 px-5 ">
        <form onSubmit={submitHandler}>
<div class="row ">
  <div class="col ">
  <select required onChange={(e) => setFrom(e.target.value)} class="custom-select  select-location ">
<option  value="" >Select Departure</option>
<option value="sukkur">Sukkur</option>
<option value="lahore"> Lahore </option>

</select>
  </div>
  <div class="col">
  <select required onChange={(e) => setTo(e.target.value)} class="custom-select select-location">
<option     value="">Select Arrival</option>
<option value="karachi">Karachi</option>
<option value="faisalabad">Faisalabad</option>

</select>

  </div>
  <div class="col">
  <DatePicker  selected={departureDate} onChange={(date) => setDepartureDate(date)} />
</div>
<div class="col">
 <button type="submit" class="btn btn-primary btn-lg select-location btn-for-all">Search</button>

 </div>
        </div>
       
</form>
</div>
</div>   


          {/* {loading? ( 
           <LoadingBox> </LoadingBox>
          ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
          ) : ( 
              <>
              {buses.length === 0 && (
                <MessageBox>No Bus Found</MessageBox>
              )}
              <div className="row center">
                {buses.map((bus) => (
                  <Bus key={bus._id} bus={bus}></Bus>
                ))}
              </div>
                         </>

          )} */}


<div class="container services-cards">
<div className='our-services'>
<p >
  Our Services
</p>
</div>
<div class="row">
  <div class="col-md-4">
    <div class="card card-1">
      <h3>Ionic Native</h3>
      <p>A curated set of   ES5/ES6/TypeScript wrappers for plugins to easily add any native functionality to your Ionic apps.</p>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card card-2">
      <h3>UI Components</h3>
      <p>Tabs, buttons, inputs, lists, cards, and more! A comprehensive library
        of mobile UI components, ready to go.</p>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card card-3">
      <h3>Theming</h3>
      <p>Learn how to easily customize and modify your app’s design to fit your
        brand across all mobile platform styles.</p>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-4">
    <div class="card card-1">
      <h3>Ionic Native</h3>
      <p>A curated set of   ES5/ES6/TypeScript wrappers for plugins to easily add any native functionality to your Ionic apps.</p>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card card-2">
      <h3>UI Components</h3>
      <p>Tabs, buttons, inputs, lists, cards, and more! A comprehensive library
        of mobile UI components, ready to go.</p>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card card-3">
      <h3>Theming</h3>
      <p>Learn how to easily customize and modify your app’s design to fit your
        brand across all mobile platform styles.</p>
    </div>
  </div>
</div>
</div>


<div className='slider'>

      </div>
     </div>\






// old navbar

<header  className="row">
   
<div>
    <Link className="brand" to="/">EasyBus</Link>
</div>
<div>

{/* <SearchBox></SearchBox> */}



</div>
<div>

    {/* <!-- cart --> */}
    <Link to="/bookedSeats">Booked
    {
        bookedSeats.length > 0 && (
            <span className='badge'>{bookedSeats.length}</span>
        ) 
    }
    </Link>
    {
        userInfo ? (
            <div className='dropdown'> 
                <Link to={'#'}>
                    {userInfo.name} <i className='fa fa-caret-down'></i>
                </Link>
                <ul className='dropdown-content'>
                    <li>
                        <Link to={'/profile'}>User Profile</Link>
                    </li>
                    <li>
                        <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                        <Link to={'#signout'} onClick={signoutHandler}>Sign Out</Link>
                    </li>
                </ul>
            </div>
                   
        ) : 
        (
            <Link to="/signin">Sign In</Link>
        )
    }
    {userInfo && userInfo.isSeller && (
            <div className='dropdown'>
            <Link to={'#admin'}>Seller {' '}<i className='fa fa-caret-down'></i></Link>
            <ul className='dropdown-content'>
                <li>
                    <Link to={'/buslist/seller'}>Buses</Link>
                </li>
                <li>
                    <Link to={'/orderlist/seller'}>Orders</Link>
                </li>

            </ul>

        </div>   
    )}
    {userInfo && userInfo.isAdmin && (
        <div className='dropdown'>
            <Link to={'#admin'}>Admin {' '}<i className='fa fa-caret-down'></i></Link>
            <ul className='dropdown-content'>
                <li>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li>
                    <Link to={'/buslist'}>Buses</Link>
                </li>
                <li>
                    <Link to={'/orderlist'}>Orders</Link>
                </li>
                <li>
                    <Link to={'/userlist'}>Users</Link>
                </li>
            </ul>

        </div>
    )}
</div>

</header>


































<div className='parent-dev'>
     



<div class="location-form bg-light shadow-lg  py-5 px-5 ">


  
<form onSubmit={submitHandler}>
<div class="row ">
<div class="col ">
<select required onChange={(e) => setFrom(e.target.value)} class="custom-select  select-location ">
<option  value="" >Select Departure</option>
<option value="sukkur">Sukkur</option>
<option value="lahore"> Lahore </option>

</select>
</div>
<div class="col">
<select required onChange={(e) => setTo(e.target.value)} class="custom-select select-location">
<option     value="">Select Arrival</option>
<option value="karachi">Karachi</option>
<option value="faisalabad">Faisalabad</option>

</select>

</div>
<div class="col">
<DatePicker  selected={departureDate} onChange={(date) => setDepartureDate(date)} />
</div>
<div class="col">
<button type="submit" class="btn btn-primary btn-lg select-location btn-for-all">Search</button>

</div>
</div>

</form>



</div>




</div>  