import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../Assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext/UserContext'
import { CartContext } from '../../UserContext/CartContext'
import { WhistlistContext } from '../../UserContext/Whishlist'
export default function Navbar() {
  let {UserToken,setUserToken} = useContext(UserContext)

  let {firstlen} = useContext(WhistlistContext)
  let {numberOfCartItems,setnumberOfCartItems,GetCartItems,addtocart}= useContext(CartContext)
 
  // function navnums(){
  //   {firstlen}
  //   {numberOfCartItems}
  // }
  // useEffect(()=>{
  //   getint()
  // },[])


 let navigate = useNavigate()
  function logout(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/Login')
  }
  return <>
  <nav className="navbar fixed-top  navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to={'/'}>
      <img src={logo} alt="fresh cart" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {UserToken != null? <>
          <li className="nav-item">
          <Link  className="nav-link active"  aria-current="page" to={'/'} >Home</Link>
        </li>


       


        <li className="nav-item">
          <Link  className="nav-link active"aria-current="page" to={'Products'} >Products</Link>
        </li>



        <li className="nav-item">
          <Link  className="nav-link active" aria-current="page" to={'Categories'} >Categories</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'Brands'} >Brands</Link>
        </li>
        <li className="nav-item">
          <Link  className="nav-link active" aria-current="page" to={'AllOrders'} >AllOrders</Link>
        </li>

       
        </>: ''}
       
        
      </ul>



      <ul className="navbar-nav d-flex align-items-center ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <i className='fab fa-facebook me-2'></i>
          <i className='fab fa-twitter me-2'></i>
          <i className='fab fa-instagram me-2'></i>
          <i className='fab fa-youtube me-2'></i>
        </li>

        {UserToken != null ? <>


          <li className="nav-item position-relative">
          <Link className="nav-link active" aria-current="page" to={'Cart'} ><i className="fa-solid text-main fa-cart-shopping"></i></Link>
          <span className="position-absolute top-0 start-100 translate-middle bg-main text-light badge rounded-pill bg-danger">
              {numberOfCartItems}
          </span>
        </li>

        
          <li className="nav-item position-relative">
          <Link className="nav-link active" aria-current="page" to={'Whishlist'} ><i className="fa-solid fa-heart text-main fs-4"></i></Link>
          <span className="position-absolute top-0 start-100 bg-main text-light translate-middle badge rounded-pill bg-danger">
              {firstlen}
          </span>
        </li>
          <li className="nav-item">
          <span onClick={logout} className="nav-link  cursor-pointer "  >Logout</span>
        </li>

     
        </> : <>
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'Register'} >Register</Link>
        </li>



        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={'Login'} >Login</Link>
        </li>

        
        </> }
      


       
        
      </ul>
      
    </div>
  </div>
</nav>
  
  </>
}
