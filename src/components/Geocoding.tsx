import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import Loader from "./Loader";

export default () => {
  // Variablen-Deklarationen
  const [location, setLocation] = useState('');
  const inputRef = useRef<string | null>(null);
  const [results, setResults] = useState<React.ReactNode | null>(null);
  const prevLocationRef = useRef<string | null>(null);
  const classesResultsDiv = useRef<string | null>(null)
  const [showCloseButton, setShowCloseButton] = useState<boolean >(false);
  const classesGeocodingBackgroundDiv = useRef<string>('overflow-auto z-0')
  
  useEffect(() =>  {
    if(results) {
      setShowCloseButton(true)
    }
    else if (!results) {
      setShowCloseButton(false)
    }
    else {
      setShowCloseButton(false)
    }
  },[results])
  // Geocoding-Abfrage
  const geocodingQuery = useQuery({
    queryFn: () =>
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`).then((res) =>
        res.json(),
      ),
    queryKey: ['geocodingQuery', location],
  });
  useEffect(() => {
    if (geocodingQuery.data && geocodingQuery.data.results && location !== prevLocationRef.current) {
      prevLocationRef.current = location;
      console.log('Item Data',geocodingQuery.data.results)
      setResults(
        geocodingQuery.data.results.map((item) => (
          <motion.div  className='w-full flex justify-center z-0 m-2 '>
            <AnimatePresence>
            <motion.div key={'results'} whileHover={{scale:1.1}} whileTap={{scale:0.9}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='md:w-1/2 w-full rounded-3xl h-20 bg-normal z-0 p-5' onClick={() => {setShowCloseButton(false);classesResultsDiv.current=null;window.localStorage.setItem('longitude',item.longitude);window.localStorage.setItem('latitude',item.latitude);localStorage.setItem('location',`${item.admin4}, ${item.admin3}`);window.location.reload()}} >
              <h1 className='text-left font-bold'>{item.admin4 || 'No information'}</h1>
              <p className='text-left'>{item.admin3 || item.admin2 || item.admin1}</p>
              <div className='grid items-center justify-end'>
              <p className='text-right'>{item.country}</p>
              </div>
            </motion.div>
            </AnimatePresence>
          </motion.div>
        ))
      );
    }
  }, [location, geocodingQuery.data]);
  if(geocodingQuery.isError) {
    console.log('Error')
    return (<div>
      Error
    </div>)
  }
  if(geocodingQuery.isLoading) {
    console.log('Loading')
    return (<Loader/>)
  }

  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        setLocation(inputRef.current || '');
      }}>
        <div className='fixed bottom-0 right-0 left-0 md:py-4 py-1 flex md:justify-center z-50'>
          <div className='bg-dark-blue/40 md:w-2/3 w-full h-16 rounded-2xl flex justify-center items-center space-x-2'>
            <motion.input
              whileFocus={{ scale: 0.9 }}
              type="text"
              onChange={(event) => { inputRef.current = event.target.value; }}
              className='relative w-2/3 z-50'
            />
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.01 }}
              type='submit'
              className='relative w-1/4 bg-dark-blue z-10 h-12 text-smooth-white font-bold z-50'
            >
              Submit
            </motion.button>
          </div>
        </div>
      </form>

      <div className={results && 'h-full w-full fixed bottom-0 z-0' }>
        <motion.div className={results && 'overflow-auto z-0'}>
            {results}
        </motion.div>
        <div>
          <AnimatePresence>
            {showCloseButton && <motion.button
    
              initial={{opacity:0,y:-100}}
              animate={{opacity:1,y:[10,0,]}}
              exit={{opacity:0,y:[10,-100] }}
              whileTap={{scale:0.7}} onTap={() => {setResults(null)}}
              className='absolute top-0 right-0 bg-red-900 z-50'>Close
            </motion.button>}
          </AnimatePresence>
        </div>
      </div>
      
    </>
  );
};
