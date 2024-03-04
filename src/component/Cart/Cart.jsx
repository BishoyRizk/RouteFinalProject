import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../UserContext/CartContext'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
export default function Cart() {
let {GetCartItems,deleteCartItems,updateCartItems,setnumberOfCartItems} = useContext(CartContext)
const [Loading, setLoading] = useState(true)
const [Cart, setCart] = useState(null)



async function GetItems(){
  let {data} = await GetCartItems()
  setCart(data)
  console.log(data);
  setLoading(false)
}


async function deleteitem(id){
  setLoading(true)
  let {data} = await deleteCartItems(id)
  setCart(data)
  setnumberOfCartItems(data.numOfCartItems)
  setLoading(false)
}



async function updatecart(id,count){
    if(count < 1){
      setLoading(true)

      let {data} = await deleteCartItems(id)
      setnumberOfCartItems(data.numOfCartItems)
      
      setCart(data)
      setLoading(false)
      
    }else{
      let {data} = await updateCartItems(id,count)
      setCart(data)
      
    }

}



useEffect(()=>{
  GetItems()
},[])
  return <>
    <div className='bg-main-light carttt p-2 mt-5'>
      <h2>YOUR CART</h2>
      
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
  </div> : Cart? <>
    <p className='text-main'>numOfCartItems : {Cart.numOfCartItems}</p>
    <p className='text-main'>totalCartPrice : {Cart.data.totalCartPrice} EGP</p>
    {Cart.data.products.map((product,index) =>   <div key={index} className="row align-items-center border-1 m-0 border-bottom p-2">

      <div className="col-md-1">
        <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
      </div>
      <div className="col-md-10">
        <div className="item">
          <h3 className='h5  fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
          <p className='text-main fw-bold'>Price :{product.price} EGP</p>
          <button onClick={()=> deleteitem(product.product.id)} className='btn'> <i className='fas fa-trash-can text-danger'></i> Remove</button>
        </div>
      </div>

      <div className="col-md-1">
        <div className="count">
          <button onClick={()=> updatecart(product.product.id,product.count +1)} className='btn brdr p-1'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={()=> updatecart(product.product.id,product.count -1)} className='btn brdr p-1'>-</button>
        </div>
      </div>

     </div>)}
  <Link className='btn bg-main text-light m-3' to={`/shippingAddress/${Cart.data._id}`}>online payment</Link>
  </> : <Link to={'/'} className='btn text-light bg-main'>TheCartIsEmpty</Link>}
    </div>
  </>
}
