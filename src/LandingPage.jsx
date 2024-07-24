import React from 'react'
import Landing from './Components/Landing'
import About from './Components/About'
import TopServices from './Components/TopServices'
import Insights from './Components/Insights'
import Hotels from './Components/Hotels'
import Fields from './Components/Fields'
import Testimonials from './Components/Testimonials'

export default function LandingPage() {
  return (
    <div>
        <Landing/>
        <About/>
        <TopServices/>
        <Insights/>
        <Hotels/>
        <Fields/>
        <Testimonials/>
    </div>
  )
}
