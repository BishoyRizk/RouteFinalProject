import React from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
export default function Brands() {

  
   function GETBRANDS(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
   }
   let {data,isLoading} = useQuery('Brands',GETBRANDS)
   console.log(data?.data.data);

  
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
  </div> : <div className='row gy-4'>
    {data?.data.data.map(brand => <div key={brand._id} className='col-md-3'>
        <div className='brand brddr  p-2'>
          <Link to={`/BrandsDetails/${brand._id}`}>
            <img src={brand.image} className='w-100' alt="" />
            <h4 className='text-main'>{brand.name}</h4>
          </Link>
        </div>
    </div>)}




  </div>

   }
  
  </>
}
