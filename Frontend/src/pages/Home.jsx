import Categories from '@/components/component_lite/Categories'
import Footer from '@/components/component_lite/Footer'
import Header from '@/components/component_lite/Header'
import LatestJobs from '@/components/component_lite/LatestJobs'
import Navbar from '@/components/component_lite/Navbar'
import React from 'react'
export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <Categories/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}
