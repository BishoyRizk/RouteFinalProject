import React, { useContext } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../UserContext/CartContext';
export default function ShippingAddress() {
 let {CheckOutSession} = useContext(CartContext)
  let {cartId} = useParams()
  
   async function CheckOut(values){
    let {data} = await CheckOutSession(cartId,values)
    console.log(data);
    if(data.status == 'success'){
      window.location.href = data.session.url
    }
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },onSubmit:CheckOut
  })
  return <>
    <div className="row w-75 shipping mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">details</label>
        <input onChange={formik.handleChange} id='details' name='details' type="text" className='form-control mb-3' />


        <label htmlFor="phone">phone</label>
        <input onChange={formik.handleChange} id='phone' name='phone' type="tel" className='form-control mb-3' />


        <label htmlFor="city">city</label>
        <input onChange={formik.handleChange} id='city' name='city' type="text" className='form-control mb-3' />

        
        <button type='submit' className='btn bg-main text-light'>CheckOut</button>
      </form>
    </div>
  
  </>
}
