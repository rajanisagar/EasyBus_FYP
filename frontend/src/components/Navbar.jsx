import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.ico";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { listBusCategories } from "../actions/busActions";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/styles.css";
export default function Navbar() {
  const navigate = useNavigate()

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
  const [navbarState, setNavbarState] = useState(false);
  return (
    <>
            <Wrapper className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
            <div className="container px-5">
             
                <Link to={'/'} className='navbar-brand fw-bold link'> 
        <div className="brand">
          <div className="container">
                     
          < img className="logo-img" src={logo} alt="" />
           EasyBus

          </div>

        </div>
        </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="bi-list"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                       
               
          <li className="nav-item">
            {userInfo && userInfo.isSeller && (
            <div className='dropdown'>
            <Link className="nav-link me-lg-3"  to={'#admin'}>Vendor</Link>
            <ul className='dropdown-content'>
                <li>
                    <Link to={'/buslist/seller'}>Buses</Link>
                </li>
                <li>
                    <Link to={'/orderlist/seller'}>Reservations</Link>
                </li>

            </ul>

        </div>   
    )}
          </li>
          
          <li className="nav-item">
          {userInfo && userInfo.isAdmin && (
        <div className='dropdown'>
          
            <Link className="nav-link me-lg-3" to={'#admin'}>Admin  </Link> 
            <ul className='dropdown-content'>
                {/* <li>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li> */}
                {/* <li>
                    <Link to={'/buslist'}>Buses</Link>
                </li>
                <li>
                    <Link to={'/orderlist'}>Orders</Link>
                </li> */}
                <li>
                    <Link to={'/userlist'}>Users</Link>
                </li>
            </ul>
           
        </div>
    )}
          </li>
          <li className="nav-item">
          {
        userInfo ? (
            <div className='dropdown'> 
           


                <Link className="nav-link me-lg-3 " to={'#'} style={{color: "#2937f0"}}>
                {/* <i className='fa fa-caret-down'></i> fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto,Oxygen",}}*/}
                <i  style={{marginRight:'1rem', textDecoration:"none",}} className="fa-solid fa-circle-user " > <span style={{fontWeight:"500", fontSize:"1rem", fontFamily:"   Mulish, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;"}}>{userInfo.name}</span> </i>


                   
                </Link>
                <ul className='dropdown-content'>
                    <li>
                        <Link  to={'/profile'}>User Profile</Link>
                    </li>
                    <li>
                        <Link to="/bookedSeats">Booked Seats</Link>
                    </li>
                    <li>
                        <Link to="/orderhistory">Reserved Seats</Link>
                    </li>
                    <li>
                        <Link to={'#signout'} onClick={signoutHandler}>Sign Out</Link>
                    </li>
                </ul>
            </div>
                   
        ) : 
        (
          
          // <button onClick={() => navigate('/signin')}>Sign In</button>
          <button className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" onClick={() => navigate('/signin')}>
          <span className="d-flex align-items-center">
              <span className="small">SIGN IN</span>
          </span>
      </button>
        )
    }
          </li>

                          </ul>
                    {/* <button className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                        <span className="d-flex align-items-center">
                            <i className="bi-chat-text-fill me-2"></i>
                            <span className="small">Send Feedback</span>
                        </span>
                    </button> */}
                </div>
            </div>
        </Wrapper>

    
      <ResponsiveNav state={navbarState}>
        <ul>
          <li>
            <a href="#home" onClick={() => setNavbarState(false)}>
              Home
            </a>
          </li>
          <li>

          </li>


        </ul>
      </ResponsiveNav>
    </>
  );
}
const Wrapper = styled.nav`{
  .navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  //   padding-top: 1rem;
  //   padding-bottom: 1rem;
  // background-color: #fff;
   .brand {
    .container {


      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.5rem;
      font-weight: 600;
      color: #000;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
  .user-profile {
    
    color: #0077b6;
    // font-weight: 600;
  
}
.upper-profile:hover{
  color: #0077b6;
  // font-weight: 500;

}
.upper-profile{
  color: #0c2e53;
  
  // font-weight: 500;

}
ul {
  
  margin-top: 0.5rem;
  display: flex;
  gap: 0.3rem;
  list-style-type: none;
  li {
    a {
      text-decoration: none;
      color: black;
      // font-size: 1rem;
      transition: 0.1s ease-in-out;
      &:hover {
        color: #0077b6;
      }
    }

  }
}

/* dropdown */
.dropdown{
display: inline-block;
position: relative;
.l {
  // padding: 2rem 0rem;
  background-color: ;
  padding-left: 1rem;
  font-size: 1.1rem;
  
}
}
.dropdown-content{
position: absolute;
display: none;
right: 0;
min-width: 8rem;  
padding: 0.5rem;
z-index: 10;
background-color: white;
margin-left: 0rem;
margin-top: -0.5rem;
border-radius: 0.2rem;  
font-size: 1rem;
color: #03045e;
align-items: center;


}
}
.dropdown:hover .dropdown-content{
display: block;
opacity:0.9;

}


}`;

const Nav = styled.nav`
  // min-width : 1080px
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0rem 1.5rem;
  margin-top: 0rem;
  

  .brand {
    .container {


      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.5rem;
      font-weight: 900;
      color: #000;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
 .user-profile {
    
      // color: #0077b6;
      // font-weight: 600;
    
  }
  .upper-profile:hover{
    // color: #0077b6;
    // font-weight: 500;

  }
  .upper-profile{
    // color: #0c2e53;
    // font-weight: 500;

  }
  ul {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.3rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: black;
        font-size: 1rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #0077b6;
        }
      }

    }
  }
  
/* dropdown */
.dropdown{
  display: inline-block;
  position: relative;
  .l {
    padding: 2rem 0rem;
    background-color: ;
    padding-left: 1rem;
  }
}
.dropdown-content{
  position: absolute;
  display: none;
  right: 0;
  min-width: 8rem;  
  padding: 0.5rem;
  z-index: 10;
  background-color: white;
  margin-left: 0rem;
  margin-top: 1rem;
  border-radius: 0.2rem;  
  font-size: 1rem;
  color: #03045e;
  align-items: center;

 
}
}
.dropdown:hover .dropdown-content{
  display: block;
  opacity:0.9;

}


  button {
    
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #48cae4;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #023e8a;
    }
  }
  // @media screen and (min-width: 280px) and (max-width: 1080px) {
  //   .brand {
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     width: 100%;
  //     .toggle {
  //       display: block;
  //     }
  //   }
  //   ul {
  //     display: none;
  //   }
  //   button {
  //     display: none;
  //   }
  // }
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "50px" : "-400px")};
  background-color: white;
  height: 30vh;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;

      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
`;
