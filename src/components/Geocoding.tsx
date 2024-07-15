import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Loader } from './Loader';
import { useQueryClient } from '@tanstack/react-query';

export function Geocoding() {
  // Variablen-Deklarationen
  const [location, setLocation] = useState('');
  const inputRef = useRef<string | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const prevLocationRef = useRef<string | null>(null);
  const classesResultsDiv = useRef<string | null>(null);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  const [showResultsWrapperClasses, setResultsWrapperClasses] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(true)
  const queryClient = useQueryClient(); //Query Client
  useEffect(() => {
    if(results) {
      console.log('set wrapper classes')
      setResultsWrapperClasses(true);
      //log results
      console.log({results})
    }
    else if (!results) {
      setTimeout(() => {
        console.log('unset wrapper classes')
        setResultsWrapperClasses(false)
      },1000) 
    }
  },[results])
  useEffect(() =>  {
    if(results) {
      setShowCloseButton(true)
      setShowInput(false)
    }
    else if (!results) {
      setShowCloseButton(false)
      setShowInput(true)
    }
    else {
      setShowCloseButton(false)
      setShowInput(true)
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
      setResults(geocodingQuery.data.results)
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
    console.log('Loading State, data : ',geocodingQuery.data)
    return (<Loader/>)
  }
  if(geocodingQuery.data === undefined && !geocodingQuery.isLoading) {
    console.log('No results')
  }
  return (
    <>
    <AnimatePresence>
      {showInput && 
       <form onSubmit={(event) => {
        queryClient.resetQueries({ queryKey: ['geocodingQuery', location] })
        event.preventDefault();
        setLocation(inputRef.current || '');
      }}>
        <div className='fixed bottom-0 right-0 left-0 md:py-4 py-1 flex md:justify-center z-50'>
          <motion.div className='bg-dark-blue/40 md:w-2/3 w-full h-16 rounded-xl flex justify-center items-center space-x-2 md:space-x-10'
            exit={{y:50}}
            animate={{y:0}}
            initial={{y:50}}>
            <motion.input
            
              whileFocus={{ scale: 0.9 }}
              type="text"
              onChange={(event) => { inputRef.current = event.target.value; }}
              className='w-2/3 z-50 p-3 rounded-xl bg-dark-blue text-smooth-white font-bold'
              placeholder="Where's your location"
            />
            <motion.button
              exit={{y:50}}
              animate={{y:0}}
              initial={{y:50}}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.01 }}
              type='submit'
              className='w-1/4 bg-dark-blue z-10 h-12 text-smooth-white font-bold z-50 rounded-xl'
            >
              Submit
            </motion.button>
          </motion.div>
        </div>
      </form>
      }

      </AnimatePresence>

      <div className={showResultsWrapperClasses && 'overflow-auto h-full w-full top-0 fixed z-0' }>
        <motion.div className={showResultsWrapperClasses && 'overflow-y-auto overflow-x-hidden z-0'}> 
          <AnimatePresence>
            {results && results.map((item,index) => (
              <motion.div  
                key={`result${index}`} 
                className='w-full flex justify-center z-0 m-2 '
                initial={{y:window.innerHeight,scale:0.2,overflow:'hidden'}} 
                animate={{y:0,scale:1}} 
                exit={{y:window.innerHeight,scale:0.2,overflow:'hidden'}}
                transition={{duration:0.3}}>
                <motion.div  whileHover={{scale:1.1,cursor: 'grab'}} 
                  whileTap={{scale:0.9,cursor:'grabbing'}}
                  className='md:w-1/2 w-full rounded-3xl h-20 bg-dark-blue z-0 p-5' 
                  onClick={() => {setShowCloseButton(false);
                    classesResultsDiv.current=null;
                    window.localStorage.setItem('longitude',item.longitude);
                    window.localStorage.setItem('latitude',item.latitude);
                    localStorage.setItem('location',`${item.admin4||"No information"}, ${item.admin3||item.admin2||item.admin1}`);
                    window.location.reload()}} >
                  <h1 className='text-left font-bold text-smooth-white'>{item.admin4 || 'No information'}</h1>
                  <p className='text-left text-smooth-white'>{item.admin3 || item.admin2 || item.admin1} | {item.country}</p>
                </motion.div>
             </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div>
          <AnimatePresence>
            {showCloseButton && <motion.button
              initial={{opacity:0,y:-100}}
              animate={{opacity:1,y:[10,0,]}}
              exit={{opacity:0,y:[10,-100] }}
              whileTap={{scale:0.7}} onTap={() => {setResults(null)}}
              className='absolute top-0 right-0 bg-red-900 z-50 p-3 rounded-xl m-4'>Close
            </motion.button>}
          </AnimatePresence>
        </div>
      </div>
      
    </>
  );
};
