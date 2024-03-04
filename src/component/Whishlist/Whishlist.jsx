import React, { useContext, useEffect, useState } from 'react'
import style from './Whishlist.module.css'
import { BallTriangle } from 'react-loader-spinner'
import { WhistlistContext } from '../../UserContext/Whishlist'
import axios from 'axios'
import { CartContext } from '../../UserContext/CartContext'
import toast from 'react-hot-toast'
export default function Whishlist() {
  // let {name} = useContext(Whishlist)
  let {name,GetItems,deletefromlist}=useContext(WhistlistContext)
  let {addtocart,setnumberOfCartItems} = useContext(CartContext)
  let {setfirstlen} = useContext(WhistlistContext)

  const [Whish, setWhish] = useState(null)
  const [Loading, setLoading] = useState(true)
  async function getwhish(){
    let {data} = await GetItems()
    console.log(data.data.length ,"Dsdsdsdfd");
    setWhish(data.data)
    
    setLoading(false)

  }


  async function DELlist(id){
   let {message,status,data} = await deletefromlist(id)
   console.log(message);
   console.log(status);
   console.log(data);
   setfirstlen(data?.data.length)
   getwhish()
   if(status == 'success'){
    toast.success(message,{
      duration:6000
    })
  }
  }
 async function PostTOCART(id){
  let {data} = await addtocart(id)
  setnumberOfCartItems(data?.numOfCartItems)
  if(data.status == 'success'){
    toast.success(data.message,{
      duration:6000
    })
  }
 }
  useEffect(()=>{
    getwhish()
  },[])
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
  </div> : Whish ?  <> <div className="row wish">
    {Whish?.map((product) =>
      <div key={product.id} className='col-md-2 overflow-hidden  position-relative'>
        <div onClick={()=> DELlist(product.id)} className='pos'  ><i className="fa-solid fa-heart-crack text-main"></i></div>
      <div className='product p-2'>
        <img src={product.imageCover} className='w-100' alt={product.title} />
        <span className='font-sm text-main'>{product.category.name}</span>
        <h3 className='h5'>{product.title.split(" ").splice(0,2).join(' ')}</h3>
        <div className='d-flex py-3 align-items-center justify-content-between'>
          <span className='font-sm'>{product.price} EGP</span>
          <span className='font-sm'>
            <i className='fas fa-star rating-color me-1'></i>
            {product.ratingAverage}</span>
        </div>
        <button onClick={()=> PostTOCART(product.id)} className='btn btn-sm bg-main w-100 text-white'>Add To Cart</button>
      </div>
    </div>

    )}
  </div> </> : '' } 

 
  </>
}
