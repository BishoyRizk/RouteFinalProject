import React, { useEffect, useState } from 'react'
import style from './BrandsDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
export default function BrandsDetails() {
  const [Details, setDetails] = useState({})
  const [Loading, setLoading] = useState(true)

  let {id} = useParams()

console.log(id);
  async function GetBrandsDetails(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    console.log(data , "the data of the ");
    setDetails(data)
    setLoading(false)


  }


  useEffect(()=> {
    GetBrandsDetails(id)
  },[])
  return  <>

  
 {Loading ?  <div className=" text-center  d-flex align-items-center justify-content-center ">
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
  </div> : <div key={Details?._id} className='row  align-items-center heightClass brndsDetails mx-5 mt-5'>
    <div className="col-md-4">
    <img src={Details?.data?.image} className='w-100' alt="" />
    </div>
    <div className="col-md-8">
        <h4>{Details?.data?.name}</h4>
    </div>
    </div>} 
    
   
  </>
}
