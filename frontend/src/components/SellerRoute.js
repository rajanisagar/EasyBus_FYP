import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, useNavigate, Navigate, Outlet  } from 'react-router-dom'

export default function SellerRoute({component: Component, ...rest}){
    const navigate = useNavigate()
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo} = userSignin 
    return(userInfo && userInfo.isSeller ? <Outlet /> : <Navigate to="/signin" />)

}