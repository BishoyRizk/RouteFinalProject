import React from 'react'
import style from './Notfound.module.css'
import img from '../../Assets/images/error.svg'
export default function Notfound() {
  return <>
      <div className="row">
        <div className="col-md-12">
          <img src={img} className='w-100' alt="" />
        </div>
      </div>
  </>
}
