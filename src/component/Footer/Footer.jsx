import React from 'react'
import style from './Footer.module.css'
import visa from '../../Assets/images/visa1.jpg'
import master from '../../Assets/images/master2.jpg'
import us from '../../Assets/images/usa3.webp'
import val from '../../Assets/images/v4.png'
import gog from '../../Assets/images/go1.webp'
import apple from '../../Assets/images/app2.png'
export default function Footer() {
  return <>
<div className="Footer px-5 py-3 row mt-2">
 
    <div className="col-md-12">
      <h3>get the freshCart app</h3>
      <p>we will send you a link open it on your phone to download the app</p>
    </div>

    <div className="col-md-12 inputborderbottem py-3">
      <div className="row">
      <div className="col-md-10 ">
      <input placeholder='Email ....' className='form-control' type="text" />
    </div>

    <div className="col-md-2">
      <button className='w-100 btn bg-main text-white'>share the app link</button>
    </div>

      </div>
    </div>

    <div className="col-md-12 mt-3 inputborderbottem py-3 ">
      <div className="row">
      <div className="col-md-6  d-flex align-items-center">
      <h5>payments partners</h5>
      <img src={visa} className='visalogo px-2' alt="" />
      <img src={master} className='visalogo px-2' alt="" />
      <img src={us} className='visalogo px-2' alt="" />
      <img src={val} className='visalogo px-2' alt="" />


    </div>

    <div className="col-md-6 d-flex align-items-center">
      <h5>get deliveries with freshCart</h5>
      <img src={gog} className='logos px-2' alt="" />
      <img src={apple} className='logos px-2' alt="" />
    </div>

      </div>
    </div>
   

  
</div>
  
  </>
}
