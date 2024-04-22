import React, { useState,useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
//components
import FirstContainer from './components/FirstContainer';
import ChartNextHours from './components/NextHours';
import Geocoding from './components/Geocoding';
import Loader from './components/Loader';
import { Scale } from 'lucide-react';
function App() {
  //var definition
  const [currentLocation, setCurrentLocation] = useState<string>()
  useEffect(() => {
    setCurrentLocation(localStorage.getItem('location'))
  },[window.localStorage.getItem('location')])
  return (
    <>
      <motion.div animate={{y:0}} initial={{y:-20}} className='text-left pl-4 mt-2 mb-5'>
        <h1 className='text-stone-400 font-bold text-4xl mb-1'>Currently</h1>
        <h3 className='text-stone-600 font-semibold pl-2'>{currentLocation}</h3>
      </motion.div>
      <div className=''>
        <div className="weatherContainer">
        </div>
        <div className=' gap-5'>
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
