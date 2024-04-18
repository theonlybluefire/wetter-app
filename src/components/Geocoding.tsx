import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { motion } from "framer-motion";
import Loader from "./Loader";
import { isObjectLiteralElement } from 'typescript';

export default () => {
  // Variablen-Deklarationen
  const [location, setLocation] = useState('');
  const inputRef = useRef<string | null>(null);
  const [results, setResults] = useState<React.ReactNode | null>(null);
  const prevLocationRef = useRef<string | null>(null);
  const classesFirstOutputDiv = useRef<string | null>(null)

  // Geocoding-Abfrage
  const geocodingQuery = useQuery({
    queryFn: () =>
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`).then((res) =>
        res.json(),
      ),
    queryKey: ['geocodingQuery', location],
  });
  // useEffect-Hook, um den Zustand basierend auf Änderungen des location-Zustands zu aktualisieren
  useEffect(() => {
    if (geocodingQuery.data && geocodingQuery.data.results && location !== prevLocationRef.current) {
      prevLocationRef.current = location;
      classesFirstOutputDiv.current = 'h-full w-full fixed bottom-0 z-0'
      setResults(
        geocodingQuery.data.results.map((item) => (
          <motion.div whileBlur={{opacity:0}} className='w-3/4 flex justify-center z-0'>
            <div className='w-1/2 rounded-3xl h-20 bg-rose-600 z-0'>
              <h1 className='text-right font-bold'>{item.admin4}</h1>
              <p className='text-right'>{item.admin3}</p>
            </div>
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

      <div className={classesFirstOutputDiv.current}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ height: '100%', width: '100%' }}
          transition={{ duration: 0.8 }}
          className="overflow-auto z-0"
        >
          {results}
        </motion.div>
        <motion.button 
          whileTap={{scale:0.7}} onTap={() => {setResults(null)}}
          className='fixed top-0 right-0 bg-dark-blue z-50'>
            
        </motion.button>
        
      </div>
      
    </>
  );
};
