import React, { useEffect, useState } from 'react'
import style from './CategoriesDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
export default function CategoriesDetails() {
  const [Details, setDetails] = useState({})
  const [Loading, setLoading] = useState(true)
  let {id} = useParams()

  async function Getdetails(id){
    let {data}  = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    setDetails(data.data)
    setLoading(false)

  }

  useEffect(()=>{
    Getdetails(id)
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
  </div> : <div key={Details._id} className="row align-items-center back p-4 mx-auto w-75 mt-5">
{/* {Details._id} */}
      <div className="col-md-3">
        <img src={Details.image} className='w-100' alt="" />
      </div>
      <div className="col-md-9">
        <h2>{Details.name}</h2>
      </div>


  </div> }
  </>
}
