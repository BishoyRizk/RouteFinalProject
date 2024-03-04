import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Offline} from "react-detect-offline";
export default function Layout() {
  return <>

  <Navbar/>
  <div className="container laymarg">
  <Outlet></Outlet>

  
    
    <Offline><div className="loading  ">Only shown offline (surprise!)</div></Offline>
  


  </div>

  <Footer/>
  </>
}
