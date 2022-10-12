import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import { deleteUser, listUsers } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DELETE_RESET, USER_DETAILS_REQUEST, USER_DETAILS_RESET } from '../constants/userConstants'

export default function VendorListScreen(){
    const navigate = useNavigate()
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listUsers())
        dispatch({type: USER_DETAILS_RESET})
    }, [dispatch, successDelete])
    const deleteHandler = (user) => {
        if(window.confirm('Are You Sure to delete')){
            dispatch(deleteUser(user._id))
        }
    }
    return(
        <div className='marginTop container'>
            <h1>Vendors</h1>
            {loadingDelete && <LoadingBox></LoadingBox> }
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant='success'>User Deleted Successfully</MessageBox>}
            {
                loading ? (<LoadingBox></LoadingBox>)
                :
                error ? <MessageBox variant='danger'>{error}</MessageBox>
                :
                (
                    <table className='table'>
                        <thead>
                            <tr>

                            <th>NAME</th>
                            <th>PHONE</th>
                            <th>CNIC</th>
                            <th>EMAIL</th>
                            {/* <th>IS SELLER</th> */}
                            <th>COMPANY NAME</th>
                            <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>
                                        
                                        <td>{user.name}</td>
                                        <td>{user.phone ?user.phone: "NA" }</td>
                                        <td>{user.cnic ?user.cnic: "NA" }</td>
                                        <td>{user.email}</td>
                                        {/* <td>{user.isSeller? 'YES': 'NO'}</td> */}
                                        {/* <td>{user.isAdmin? 'YES': 'NO'}</td>   */}
                                        <td>{user.isSeller? user.seller.name: 'NA'}</td>
                                        <td>
                                            <button  type='button' className='btn btn btn-primary btn-sm' onClick={() => navigate(`/user/${user._id}/edit`)}>EDIT</button>
                                            <button type='button' className='btn btn btn-danger btn-sm ml-1' onClick={() => deleteHandler(user)}>DELETE</button>
                                        </td>            
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}