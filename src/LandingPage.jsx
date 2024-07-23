import React from 'react'
import Landing from './Components/Landing'
import About from './Components/About'
import TopServices from './Components/TopServices'
import Insights from './Components/Insights'

export default function LandingPage() {
  return (
    <div>
        <Landing/>
        <About/>
        <TopServices/>
        <Insights/>
    </div>
  )
}
