import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Cart from './component/Cart/Cart'
import Products from './component/Products/Products'
import Categories from './component/Categories/Categories'
import Brands from './component/Brands/Brands'
import Notfound from './component/Notfound/Notfound'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import { UserContext } from './UserContext/UserContext'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import BrandsDetails from './component/BrandsDetails/BrandsDetails'
import Whishlist from './component/Whishlist/Whishlist'
import CategoriesDetails from './component/CategoriesDetails/CategoriesDetails'
import ShippingAddress from './component/ShippingAddress/ShippingAddress'
import AllOrders from './component/AllOrders/AllOrders'
import ForgetPassword from './component/ForgetPassword/ForgetPassword'
import ResetPassword from './component/ResetPassword/ResetPassword'
import GetNewPass from './component/GetNewPass/GetNewPass'






export default function App() {

  let routers = createHashRouter([
    {path:'', element:<Layout/>, children:[
      {index:true ,element : <ProtectedRoute><Home/></ProtectedRoute>},
      {path:'Cart' ,element : <ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'Products' ,element : <ProtectedRoute><Products/></ProtectedRoute>},
      {path:'ProductDetails/:id' ,element : <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'BrandsDetails/:id' ,element : <ProtectedRoute><BrandsDetails/></ProtectedRoute>},
      {path:'Categories' ,element : <ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'Brands' ,element : <ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'AllOrders' ,element : <ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'ShippingAddress/:cartId' ,element : <ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'Whishlist' ,element : <ProtectedRoute><Whishlist/></ProtectedRoute>},
      {path:'CategoriesDetails/:id' ,element : <ProtectedRoute><CategoriesDetails/></ProtectedRoute>},
      {path:'register' ,element : <Register/>},
      {path:'ForgetPassword' ,element : <ForgetPassword/>},
      {path:'ResetPassword' ,element : <ResetPassword/>},
      {path:'GetNewPass' ,element : <GetNewPass/>},
      {path:'login' ,element : <Login/>},
      {path:'*' ,element : <Notfound/>},
    ]}
  ])

let {setUserToken} = useContext(UserContext)
 useEffect(()=> {
  
  if (localStorage.getItem('userToken')){
   setUserToken(localStorage.getItem('userToken'))
  }
 
 },[])

 
  return <>
  
  <RouterProvider router={routers}>
  </RouterProvider>
    <Toaster/>

 
  
   </>
}
