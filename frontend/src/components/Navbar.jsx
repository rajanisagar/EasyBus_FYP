import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.ico";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { listBusCategories } from "../actions/busActions";
import { Link, useNavigate } from "react-router-dom";
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
      <Nav>
        <div className="brand">
          <div className="container">
            < img className="logo-img" src={logo} alt="" />
           EasyBus
          </div>

          
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li>
          {
        userInfo ? (
            <div className='dropdown'> 
                <Link className="user-profile" to={'#'}>
                {/* <i className='fa fa-caret-down'></i> */}
                    {userInfo.name} 
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
          <button onClick={() => navigate('/signin')}>Sign In</button>
        )
    }
          </li>

          <li>
            {userInfo && userInfo.isSeller && (
            <div className='dropdown'>
            <Link className="upper-profile"  to={'#admin'}>Vendor</Link>
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
          </li>

          <li>
          {userInfo && userInfo.isAdmin && (
        <div className='dropdown'>
          
            <Link className="upper-profile" to={'#admin'}>Admin </Link>
            <ul className='dropdown-content'>
                <li>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li>
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
        </ul>
       
      </Nav>
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 2rem;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
 .user-profile {
    
      color: #023e8a;
      font-weight: 700;
    
  }
  .upper-profile:hover{
    color: #023e8a;
    font-weight: 500;

  }
  .upper-profile{
    color: #0077b6;
    font-weight: 500;

  }
  ul {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          font-weight: 700;
        }
      }

    }
  }
  
/* dropdown */
.dropdown{
  display: inline-block;
  position: relative;
}
.dropdown-content{
  position: absolute;
  display: none;
  right: 0;
  min-width: 10rem;  
  padding:  1rem;
  z-index: 10;
  background-color: white;
  margin: 0;
  margin-top: -0.1rem;
  border-radius: 0.2rem;  
  font-size: 1.1rem;
  color: #03045e;
 
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
    font-size: 1.1rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #023e8a;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle {
        display: block;
      }
    }
    ul {
      display: none;
    }
    button {
      display: none;
    }
  }
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
        font-size: 1.2rem;
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
