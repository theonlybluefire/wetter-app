import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
//components
import { FirstContainer } from './components/FirstContainer';
import { ChartNextHours } from './components/NextHours';
import { Geocoding } from './components/Geocoding';
function App() {
  if(!localStorage.getItem('longitude') && !localStorage.getItem('latitude')) {
    localStorage.setItem('longitude','13.41')
    localStorage.setItem('latitude','52.52')
  }
  //var definition
  const [currentLocation, setCurrentLocation] = useState<string>()
  const location = window.localStorage.getItem('location')
  useEffect(() => {
    setCurrentLocation(localStorage.getItem('location'))
  },[location])
  return (
    <>
      <motion.div animate={{y:0}} initial={{y:-20}} className='text-left pl-4 mt-5 mb-5'>
        <h1 className='text-stone-400 font-bold text-4xl mb-1'>Currently</h1>
        <h3 className='text-stone-600 font-semibold pl-2'>{currentLocation}</h3>
      </motion.div>
      <div className=''>
        <div className="weatherContainer">
        </div>
        <div className='grid gap-2 md:gap-10'>
          <FirstContainer/>
          <div className='w-full'>
            <ChartNextHours/>
          </div>
          
        </div>
      </div>
      <div className=''> 
          <Geocoding/>
      </div>

    </>
  );
}

export default App;
