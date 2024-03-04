import axios from 'axios';
import { useFormik } from 'formik'
import React, {  useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import {  useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
  
 


  let navigate = useNavigate()
const [fail, setFail] = useState(null)
const [success, setSuccess] = useState(null)
const [isLoading, setIsLoading] = useState(false)

let user = {
  email : ""
  
}

async function getPassword(values){

  setIsLoading(true)

  try{
  const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords" , values)

  
  if(data.statusMsg === "success"){

    

    setSuccess(data.message);
    setTimeout(function(){
      navigate("/ResetPassword")
    },1000)
  }
  
  }
  catch(err){
    // console.log(err.response.data.message);
    console.log(err);
    setFail(err.response.data.message)
  }

    setIsLoading(false)

  }


const formikObj = useFormik({
  initialValues:user,
  onSubmit: getPassword,
  
  
 })

  return <>

  {/* <Helmet>
   
    </Helmet>
   */}

  
    <div className='w-75 m-auto py-5 shadow px-5 my-5 rounded-2'>
      <h1 className='py-5 text-center'>Reset Now</h1>

    <form onSubmit={formikObj.handleSubmit}>

      
      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.email} type="email" id='email' placeholder='E-mail' className='form-control mb-3'/>
      {formikObj.errors.email && formikObj.touched.email? <p className='alert alert-danger bg-transparent border-0 text-danger p-0'> {formikObj.errors.email} </p>  : "" }
      
      {fail ? <div className='alert alert-danger'> {fail} </div>: ""}
      {success ? <div className='alert alert-success'> {success} </div>: ""}
      <button type='submit' disabled={ formikObj.isValid === false || formikObj.dirty === false  } className='btn btn-success ms-auto d-block'>
        
        {isLoading === false? "Send" : <ThreeDots 
            height="50" 
            width="50" 
            radius="9"
            color="#fff" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />}
       
      
        
      
      </button>

     
    </form>

    </div>
  
  </>
}