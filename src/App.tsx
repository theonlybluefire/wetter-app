import React, { useState,useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
//components
import ProgressCircle from './components/ProgressCircle';
import Chart from './components/Chart';
import Geocoding from './components/Geocoding';

function App() {
  //var definition
  const [location, setLocation] = useState('')
  const inputRef = useRef<string>();

  return (
    <>
      <Chart/>
      <ProgressCircle/>
      <div className='geocodingContainer'> 
         <form onSubmit={(event) => {
              event.preventDefault();
              setLocation(inputRef.current)
          }}>
            <motion.input type="text" onChange={(event) => {inputRef.current = event.target.value;}} />
            <button type='submit'>Submit</button>
          </form>
        <Geocoding location={`${location}`}/>
      </div>
    </>
  );
}

export default App;
