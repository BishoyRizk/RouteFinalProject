import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import Slider from "react-slick";
import { CartContext } from '../../UserContext/CartContext'
import toast from 'react-hot-toast'
import { WhistlistContext } from '../../UserContext/Whishlist'

export default function ProductDetails() {
  let {setnumberOfCartItems} = useContext(CartContext)
  var settings = {
    dots: false,
    infinite: true,
    autoplay:true,
    autoplaySpeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  const [Details, setDetails] = useState({})
  const [Loading, setLoading] = useState(true)
  let {id} = useParams()

 

 async function GetProductDetails(id){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  setDetails(data.data)
  setLoading(false)
 }
 useEffect(()=> {
  GetProductDetails(id)
 },[])
let {addtocart} = useContext(CartContext)

 async function POSTCART(id){
  let {data} = await addtocart(id)
  setnumberOfCartItems(data.numOfCartItems)
  console.log(data);
  if(data.status == 'success') {
    toast.success(data.message,{
      duration:6000,
      
    })
  
   }
}




  return <>

{Loading ?  <div className=" text-center  d-flex align-items-center justify-content-center vh-100">
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  // color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass="d-flex justify-content-center mt-5"
  visible={true}
  /> 
  </div> :
   <div className="row align-items-center">
    <div className="col-md-4">
    <Slider {...settings}>
     {Details.images.map(image => <img src={image} key={Details.id} className='w-100' alt={Details.title} />)}
    </Slider>

      
    </div>
    <div className="col-md-8">
      <div className="details">

        <h3 className='h5'>{Details.title}</h3>
        <p className='py-3'>{Details.description}</p>
        <span className='font-sm text-main'>{Details.category.name}</span>
        <div className='d-flex py-3 align-items-center justify-content-between'> 
       
          <span className='font-sm'>{Details.price} EGP</span>
         
          <span className='font-sm'>
            <i className='fas fa-star rating-color me-1'></i>
            {Details.ratingsAverage}</span>
        </div>
        <button onClick={()=> POSTCART(Details.id)} className='btn btn-sm bg-main w-100 text-main-light'>Add To Cart</button>
      </div>
    </div>
   </div>
   }
  </>
}
