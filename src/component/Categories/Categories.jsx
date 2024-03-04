import React from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
export default function Categories() {
  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data,isLoading} = useQuery('getCategories',getCategories)
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
    {data?.data.data.map(category => <div key={category._id} className='col-md-3'>
      <div className=' BOR'>
        {console.log(category)}
        <Link to={`/CategoriesDetails/${category._id}`}>
        <img src={category.image} height={400} className='w-100' alt="" />
        <p className='text-center p-2'>{category.name}</p>
        </Link>
       
      </div>

    </div>)}
  </div> }
 
  
  
  </>
}
