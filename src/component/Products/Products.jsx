import React, { useContext } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../UserContext/CartContext'
import toast from 'react-hot-toast'
import { WhistlistContext } from '../../UserContext/Whishlist'
export default function Products() {
  let {setnumberOfCartItems}=useContext(CartContext);
  let {setfirstlen} = useContext(WhistlistContext)

  function PRODUCTS(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let {data,isLoading} = useQuery('Products',PRODUCTS)
let {addtocart} = useContext(CartContext)
let {addtowhish}= useContext (WhistlistContext)
async function PostToCart(id){
  let {data} = await  addtocart(id)
  // console.log(data.numOfCartItems);
  
  if(data.status == 'success') {
    console.log(data.numOfCartItems);
    setnumberOfCartItems(data.numOfCartItems)
    

    toast.success(data.message,{
    duration:6000,
    
  })
 
  }

 }
 
 async function lol(id){
  let {data} = await addtowhish(id)
  console.log(data?.data.length);
  setfirstlen(data?.data.length)
  if(data.status == 'success') {
    toast.success(data.message,{
      duration:6000,
      
    })
  
   }
}

  return <>
    
    {isLoading ?  <div className=" text-center d-flex align-items-center justify-content-center vh-100">
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
  </div>   : <div className='row gy-4'>
    {data.data.data.map((product)=>   <div key={product.id} className="col-md-2 ">
    
     <div className="product pro overflow-hidden  position-relative p-2">
      <div className='po' onClick={()=>lol(product.id)} ><i className='fas fa-solid fa-heart text-main'></i></div>
     <Link to={`/ProductDetails/${product.id}`}>
        <img src={product.imageCover} className='w-100' alt={product.title} />
        <span className='font-sm text-main'>{product.category.name}</span>
        <h3 className='h5'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
        <div className='d-flex py-3 align-items-center justify-content-between'> 
          <span className='font-sm'>{product.price} EGP</span>
          <span className='font-sm'>
            <i className='fas fa-star rating-color me-1'></i>
            {product.ratingsAverage}</span>
        </div>
        </Link>
        <button onClick={()=> PostToCart(product.id)} className='btn btn-sm bg-main w-100 text-white'> + Add To Cart</button>
      </div>
    
    </div>)}
    </div>}


  </>
}
