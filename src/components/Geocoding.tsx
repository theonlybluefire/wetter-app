import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Loader } from './Loader';
import { useQueryClient } from '@tanstack/react-query';

export function Geocoding() {
  //variables
  const [location, setLocation] = useState('');
  const inputRef = useRef<string | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const classesResultsDivRef = useRef<string | null>(null);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  const [showResultsWrapperClasses, setResultsWrapperClasses] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(true)
  const queryClient = useQueryClient(); //Query Client
  const inputFormSubmittedRef = useRef<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);


  const geocodingQuery = useQuery({ //geocoding query
    queryFn: () =>
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`).then((res) =>
        res.json(),
      ),
    queryKey: ['geocodingQuery', location],
  });


  useEffect(() => {
    if(results) { //results ? then activate the classes of the results and no results container
      setResultsWrapperClasses(true);
      //log results
      console.log({results});
    }
    if (!results && inputFormSubmittedRef.current===false) {
        console.log('unset wrapper classes')
        setResultsWrapperClasses(false)
    }
    if (geocodingQuery.data && !geocodingQuery.data.results && inputFormSubmittedRef.current===true) {
      console.log('set wrapper classes no results');
      setResultsWrapperClasses(true)
    }
  },[results, geocodingQuery.data])

  useEffect(() =>  { 
    if(results) { //when results show closebutton and hide Input
      setShowCloseButton(true)
      setShowInput(false)
    }
    else if (!results) { //when no results, not show close button and show Input
      setShowCloseButton(false) 
      setShowInput(true)
    }
    else { //else not show Close button and show input
      setShowCloseButton(false)
      setShowInput(true)
    }
  },[results])

  useEffect(() => {
    if (geocodingQuery.data && geocodingQuery.data.results && inputFormSubmittedRef.current===true) { //results+form submit case
      console.log('settings results')
      setResults(geocodingQuery.data.results);
      inputFormSubmittedRef.current = false;
    }
  }, [location, geocodingQuery.data]);

  if(geocodingQuery.isError || geocodingQuery.error) { //error case
    console.log('got Error',geocodingQuery.error)
    return (<div>
      Error
    </div>)
  }
  if(geocodingQuery.isLoading) { //loading case
    return (<Loader/>)
  }
  if(geocodingQuery.data && !geocodingQuery.data.results && inputFormSubmittedRef.current===true) { //no results case
    console.log('no results, current varibales ',noResults, '<- No Reults', showInput,'<- showInput',setResultsWrapperClasses,'<- results wrapper classes')
    setNoResults(true)
    setShowInput(false)
    setResultsWrapperClasses(true)
    console.warn('No results')
    console.log('no results, laest varibales after change ',noResults, '<- No Reults', showInput,'<- showInput',showResultsWrapperClasses,'<- results wrapper classes')
    inputFormSubmittedRef.current=false;

  }

  function inputFocus() {
    console.log("Geocoding input in focus")
    setNoResults(true)
  }


  return (
    <>
    <AnimatePresence>
      {showInput && 
       <form onSubmit={(event) => {
        queryClient.resetQueries({ queryKey: ['geocodingQuery', location] })
        event.preventDefault();
        setLocation(inputRef.current || null);
        inputFormSubmittedRef.current = true
      }}>
        <div className='fixed bottom-0 right-0 left-0 md:py-4 py-1 flex md:justify-center z-50'>
          <motion.div className='bg-slate-600/40 md:w-2/3 w-full h-16 rounded-xl flex justify-center items-center space-x-2 md:space-x-10'
            exit={{y:50}}
            animate={{y:0}}
            initial={{y:50}}>
            <motion.input
            
              whileFocus={{ scale: 0.9 }}
              type="text"
              onFocus={() => inputFocus()}
              onChange={(event) => { inputRef.current = event.target.value; }}
              className='w-2/3 z-50 p-3 rounded-xl bg-zinc-900 text-smooth-white font-bold'
              placeholder="Where are you currently"
            />
            <motion.button
              exit={{y:50}}
              animate={{y:0}}
              initial={{y:50}}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.01 }}
              type='submit'
              className='w-1/4 bg-zinc-900 z-10 h-12 text-smooth-white font-bold z-50 rounded-xl'
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
                  className='md:w-1/2 w-full rounded-3xl h-20 bg-zinc-900 z-0 p-5' 
                  onClick={() => {setShowCloseButton(false);
                    classesResultsDivRef.current=null;
                    window.localStorage.setItem('longitude',item.longitude);
                    window.localStorage.setItem('latitude',item.latitude);
                    localStorage.setItem('location',`${item.admin4||"No information"}, ${item.admin3||item.admin2||item.admin1}`);
                    window.location.reload()}} >
                  <h1 className='text-left font-bold text-smooth-white'>{item.admin4 || 'No information'}</h1>
                  <p className='text-left text-smooth-white'>{item.admin3 || item.admin2 || item.admin1} | {item.country}</p>
                </motion.div>
             </motion.div>
            ))}
            {noResults && 
            <div>
              <motion.div
                className='grid backdrop-blur-sm place-content-center grid-cols-2 gap-4'
                style={{ width:'100vw',height:'100vh'}}
                initial={{y:window.innerHeight,scale:0.2,overflow:'hidden'}} 
                animate={{y:0,scale:1}} 
                exit={{y:window.innerHeight,scale:0.2,overflow:'hidden'}}
              >
                <div className='bg-zinc-900 w-1/2 h-1/3 '>

                </div>

              </motion.div>
              <motion.button 
                initial={{opacity:0,y:-100}}
                animate={{opacity:1,y:[10,0,]}}
                exit={{opacity:0,y:[10,-100] }}
                whileTap={{scale:0.7}}
                className='fixed top-0 right-0 bg-red-900 z-50 p-3 rounded-xl m-4'
                onTap={() => {setShowInput(true);setNoResults(false);setResultsWrapperClasses(true)}}
              >Close
              </motion.button>
            </div>
            }


          </AnimatePresence>
        </motion.div>
        <div>
          <AnimatePresence>
            {showCloseButton && <motion.button
              initial={{opacity:0,y:-100}}
              animate={{opacity:1,y:[10,0,]}}
              exit={{opacity:0,y:[10,-100] }}
              whileTap={{scale:0.7}} 
              onTap={() => {setResults(null)}}
              className='absolute top-0 right-0 bg-red-900 z-50 p-3 rounded-xl m-4'>Close
            </motion.button>}
          </AnimatePresence>
        </div>
      </div>
      
    </>
  );
};
