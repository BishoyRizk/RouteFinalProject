import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'

import { UserContext } from '../../UserContext/UserContext'


export default function Login() {
  const [loading, setLoading] = useState(false)
  const [ApiError, setApiError] = useState(null)
  let navigate = useNavigate()
 
  let {setUserToken} = useContext(UserContext)


 async function LoginSubmit(values){
  setLoading(true)
   let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
   .catch((err)=>{setApiError(err.response.data.message)
    setLoading(false);
  })
    if(data.message =='success'){
      setLoading(false)
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token)
      navigate('/')

    }
  }

  let validationSchema = yup.object({
    
    email: yup.string().required('email is required').email('email is invalid'),
    password: yup.string().required('password is required').matches(/^[A-Z][\w @]{5,8}$/,'invalid password ex(Ahmed123)'),
   
  })
 

 let formik = useFormik({
  initialValues : {
   
    email:'',
    password:''
   
  },validationSchema
  ,onSubmit:LoginSubmit
 })
  return<>
  <div className="w-75 mx-auto log py-4">
    <h2>LoginNow:</h2>

    <form onSubmit={formik.handleSubmit}>
      {ApiError?<div className='alert alert-danger'>{ApiError}</div>:''}
      
      
      <label htmlFor="email">email:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name='email' type="email" className='form-control mb-3' />
      {formik.errors.email && formik.touched.email?   <div className='alert alert-danger py-2' >{formik.errors.email}</div> : '' }

      <label htmlFor="password">password:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name='password' type="password" className='form-control mb-3' />
      {formik.errors.password && formik.touched.password ?   <div className='alert alert-danger py-2' >{formik.errors.password}</div> : '' }

     

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
      </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn text-white bg-main'>Login</button>}

      <Link to={'/ForgetPassword'} className='text-main mx-3'>forgetPassword?</Link>
      
     
    </form>
  </div>
  </>
}
