import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { Link } from 'react-router-dom'


export default function Home() {
  return <>
    <MainSlider/>
    <Link to={'Categories'}>
    <CategoriesSlider/>
    </Link>
  
    <FeaturedProducts/>
  
  </>
}
