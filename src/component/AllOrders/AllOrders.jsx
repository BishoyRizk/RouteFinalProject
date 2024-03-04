import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function AllOrders() {

  const [Loading, setLoading] = useState(true)
    const [Orders,setOrders] = useState([])

    async function getAllOrders(id){
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id)
      console.log(data);
      setOrders(data)
      setLoading(false)
    }

  useEffect(()=> {
    const {id} = jwtDecode(localStorage.getItem('userToken'));

    getAllOrders(id)
  },[])
  return <>

  {/* <h1 className='h'>YourOrders</h1>  */}
  <div className="row w-75 mx-auto ">
    <div className="col-md-12 text-center">
      <h2>YourOrders</h2>
      <Link to={'/Products'} className='btn bg-main'> BuyProducts</Link>
    </div>
  </div>
  {Loading? <div className=" text-center d-flex align-items-center justify-content-center vh-100">
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  // color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass="d-flex justify-content-center  mt-5"
  visible={true}
  /> 
  </div> : Orders ? <>
  {Orders.map((order) => {
     return <div key={order.id} className='row  overflow-x-auto  '>
      <div className='shadow  rounded p-4 my-5'>
        <div className='d-flex align-items-center'>
          <h2 className='fw-bolder h1'>#{order.id}</h2>
          <h4 className='fw-bolder text-primary mx-4'>processing</h4>
        </div>
        <p>you have ordered {order.cartItems.length} items</p>
        <div className='d-flex'>
          {order.cartItems.map((item)=>{
            return <img src={item.product.imageCover} key={item._id} className=' img-thumbnail' style={{width : 150 }} alt="" />
          })}
        </div>
        <hr />
        <p><strong>TotalAmount</strong>{order.totalOrderPrice}</p>
      </div>
     </div>
  }
   
  
  )}
  
  
  </> : '' }
   
  </>
}
