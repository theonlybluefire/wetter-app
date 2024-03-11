import React, { useState,useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
//components
import TempContainer from './components/FirstContainer';
import ChartNextHours from './components/NextHours';
import Geocoding from './components/Geocoding';
import Loader from './components/Loader';
function App() {
  //var definition
  const [location, setLocation] = useState('')
  const inputRef = useRef<string>();
  const [currentLocation, setCurrentLocation] = useState<string>()
  useEffect(() => {
    setCurrentLocation(localStorage.getItem('location'))
  },[window.localStorage.getItem('location')])
  return (
    <>
      <motion.div animate={{y:0}} initial={{y:-20}} className='text-left pl-4 mt-2'>
        <h1 className='text-stone-400 font-bold text-4xl mb-1'>Currently</h1>
        <h3 className='text-stone-600 font-semibold pl-2'>{currentLocation}</h3>
      </motion.div>
      <div>
        <div className="weatherContainer">
        </div>
        <div className='tempContainer'>
          <TempContainer/>
        </div>
      </div>
      <div className=''> 
         <form onSubmit={(event) => {
              event.preventDefault();
              setLocation(inputRef.current)
          }}>
            <motion.input type="text" onChange={(event) => {inputRef.current = event.target.value;}} 
            className='fixed bottom-0 left-0 mb-2'
            />
            <button type='submit' className='fixed bottom-2 right-0 mb-0 mt-0 ml-20'>Submit</button>
          </form>
        <Geocoding location={`${location}`}/>
      </div>
    </>
  );
}

export default App;
