import React, { useState,useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query"
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeaderCell,  TableRow,} from '@tremor/react';
import { motion } from "framer-motion";
import Loader from "./Loader";
import { JsxChild } from 'typescript';
export default () => { //main func
  //var def
  const [location, setLocation] = useState('')
  const inputRef = useRef<string>();
  const [startDivY, setStartDivY] = useState<number>(-100);
  const [startDivOpacity, setStartDivOpacity] = useState<number>(0);
  const [table, setTable] = useState<any>();
  //test
  const [something, setSomethings] = useState<any>();
  //geocoding Query
  const geocodingQuery = useQuery({
        queryFn: () =>
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`).then((res) =>
                res.json(),
            ),
        queryKey: ['geocodingQuery',location]
    })

    if (geocodingQuery.isLoading) { // loading case
      console.log('Loading')
            return (
            <Loader/>
            )
    }
    if (geocodingQuery.error) { //error case
        return <div>geocodingQuery.error</div>
    }
    if(geocodingQuery.data) { //data case
      if(geocodingQuery.data.results) {
        console.log(geocodingQuery.data)
        geocodingQuery.data.results.map((n) => {
          console.log(n.country_code)
      })

      }
         return (
          <>
          <form onSubmit={(event) => {
            event.preventDefault();
            setLocation(inputRef.current)
           }}>
          <div className='fixed bottom-0 right-0 left-0 md:py-4 py-1 flex md:justify-center'>
            <div className='bg-dark-blue/40 md:w-2/3 w-full h-16 rounded-2xl flex justify-center items-center space-x-2'>
              <motion.input whileFocus={{scale:0.9}} type="text" onChange={(event) => {inputRef.current = event.target.value;}}
                className='relative w-2/3 z-10'
              />
              <motion.button whileTap={{scale:0.8}} whileHover={{scale:1.01}} type='submit' className='relative w-1/4 bg-dark-blue z-10 h-12 text-smooth-white   font-bold'>Submit</motion.button>
            </div>
          </div>
          </form>
          
          <div className='flex items-center overflow-auto'>
          <motion.div initial={{opacity:1}} animate={{height:'100%',width:'100%'}} transition={{duration:0.8}} className="md:h-1/3 md:w-1/2 h-full w-full bg-dark-blue rounded-3xl text-white flex items-center justify-center z-0 h-12">
           {something}
          <br/>
          <br/>
          <br/>
        </motion.div>
        </div>
        </>

          )
        }
    }
