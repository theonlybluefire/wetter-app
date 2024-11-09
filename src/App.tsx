import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
//components
import { FirstContainer } from './components/FirstContainer';
import { ChartNextHours } from './components/NextHours';
import { Geocoding } from './components/Geocoding';
import { ChartNextDays } from './components/NextDays';
function App() {
  if(!localStorage.getItem('longitude') && !localStorage.getItem('latitude')) { //what to do if location isn't in the local storage
    localStorage.setItem('longitude','13.41')
    localStorage.setItem('latitude','52.52')
  }

  //var definition
  const [currentLocation, setCurrentLocation] = useState<string>()
  const location = window.localStorage.getItem('location')

  useEffect(() => { //pull location from local storage
    setCurrentLocation(localStorage.getItem('location'))
  },[location])


  return (
    <>
      <motion.div animate={{y:0}} initial={{y:-20}} className='text-left pl-4 mt-5 mb-5 z-10'>
        <h1 className='text-stone-200 font-bold text-4xl mb-1'>Currently</h1>
        <h3 className='text-stone-400 font-semibold pl-2'>{currentLocation}</h3>
      </motion.div>
      <div className=''>
        <div className='grid gap-2 md:gap-10'>
          <FirstContainer/>
          <div className='w-full'>
            <ChartNextHours/>
          </div>
          <div className='w-full'>
            <ChartNextDays/>
          </div>
        </div>
      </div>
      <div className='placeholder h-16'></div>
      <div> 
          <Geocoding/>
      </div>
      <div className="container">
      <div className="container__elements">
        <div className="pill">
          <div className="lanternContainer">
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
