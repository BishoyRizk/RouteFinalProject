import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'

export default function Register() {

  const [loading, setLoading] = useState(false)
  const [ApiError, setApiError] = useState(null)
  let navigate = useNavigate()


 async function registerSubmit(values){
  setLoading(true)
   let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
   .catch((err)=>{setApiError(err.response.data.message)
    setLoading(false);
  })
    if(data.message =='success'){
      setLoading(false)
      navigate('/Login')

    }
  }

  let validationSchema = yup.object({
    name: yup.string().required('name is required').min(3,'min length is 3').max(10,'max length is 10'),
    email: yup.string().required('email is required').email('email is invalid'),
    password: yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}$/,'invalid password ex(Ahmed123)'),
    rePassword: yup.string().required('rePassword is required').oneOf([yup.ref('password')],'password and rePassword are not the same'),
    phone: yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'we need an egyptian number')
  })
 

 let formik = useFormik({
  initialValues : {
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
  },validationSchema
  ,onSubmit:registerSubmit
 })
  return<>
  <div className="w-75 mx-auto py-4">
    <h2>RegisterNow:</h2>

    <form onSubmit={formik.handleSubmit}>
      {ApiError?<div className='alert alert-danger'>{ApiError}</div>:''}
      
      <label htmlFor="name">Name:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='name' name='name' type="text" className='form-control mb-3' />
      {formik.errors.name && formik.touched.name?   <div className='alert alert-danger py-2' >{formik.errors.name}</div> : '' }
      
      <label htmlFor="email">email:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name='email' type="email" className='form-control mb-3' />
      {formik.errors.email && formik.touched.email?   <div className='alert alert-danger py-2' >{formik.errors.email}</div> : '' }

      <label htmlFor="password">password:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name='password' type="password" className='form-control mb-3' />
      {formik.errors.password && formik.touched.password ?   <div className='alert alert-danger py-2' >{formik.errors.password}</div> : '' }

      <label htmlFor="rePassword">rePassword:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='rePassword' name='rePassword' type="password" className='form-control mb-3' />
      {formik.errors.rePassword && formik.touched.rePassword?   <div className='alert alert-danger py-2' >{formik.errors.rePassword}</div> : '' }

      <label htmlFor="phone">phone:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='phone' name='phone' type="tel" className='form-control mb-3' />
      {formik.errors.phone && formik.touched.phone?   <div className='alert alert-danger py-2' >{formik.errors.phone}</div> : '' }


      {loading?  <button  type='button' className='btn btn-success'>
      <BallTriangle
  height={25}
  width={25}
  radius={5}
  color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
      </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn text-white bg-main'>Register</button>}
      
      
     
    </form>
  </div>
  </>
}
