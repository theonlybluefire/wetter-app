import React, { useState,useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query"
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeaderCell,  TableRow,} from '@tremor/react';
import { motion } from "framer-motion";
import Loader from "./Loader";
export default () => { //main func
  //var def
  const [location, setLocation] = useState('')
  const inputRef = useRef<string>();
  const [startDivY, setStartDivY] = useState<number>(-100);
  const [startDivOpacity, setStartDivOpacity] = useState<number>(0);

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
      let data = [] 
      class TableObject {
        name:string;
        region:string;
        country:string;
        longitude:string;
        latitude:string;
        constructor(i:number) {
          this.name = geocodingQuery.data.results[i].name
          this.region = geocodingQuery.data.results[i].admin3;
          this.country = geocodingQuery.data.results[i].country_code;
           this.longitude = geocodingQuery.data.results[i].longitude;
           this.latitude = geocodingQuery.data.results[i].latitude
          }
        }
        if(geocodingQuery.data.results) { //results case inside data case
            for(let i = 0;i<geocodingQuery.data.results.length;i++) {
              data.push(new TableObject(i)) //pushting data from Query to data array
            }
            return (
              <>
              <form onSubmit={(event) => {
                event.preventDefault();
                setLocation(inputRef.current)
               }}>
                <motion.input whileFocus={{scale:0.9}} type="text" onChange={(event) => {inputRef.current = event.target.value;}}
                  className='fixed bottom-0 left-0 mb-2 w-2/3 z-10'
                />
                <motion.button whileTap={{scale:0.8}} whileHover={{scale:1.01}} type='submit' className='fixed bottom-2 right-0 mb-0 mt-0 ml-20 w-1/4 bg-dark-blue z-10'>Submit</motion.button>
              </form>
              <div className='overflow-auto'>
              <motion.div initial={{opacity:0,y:500}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="h-1/3 w-1/2 absolute flex items-center justify-center bg-normal-grey rounded-3xl overflow-auto w-full h-full top-0 z-0">
              <Table className="mt-8">
                <TableHead>
                  <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Name
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Region
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Country
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => ( //map over data with each cell names 'item'
                    <TableRow key={item.name}>
                      <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <motion.button className="geocodingAddButton" onClick={() => { //onClick Event
                          window.localStorage.setItem('longitude',item.longitude)
                          window.localStorage.setItem('latitude',item.latitude)
                          window.localStorage.setItem('location',item.name+', '+item.region)
                          document.location.reload(); //reload dom
                      }}
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%"
                      }}
                      >add</motion.button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <br/>
              <br/>
              <br/>
            </motion.div>
            </div>
            </>
          )
        }
        else { //no result case
          return (
            <div>
              <div className=''>
                <motion.div className='flex items-center justify-center'>
                  <motion.div  initial={{opacity:0,y: -100}} animate={{opacity: startDivOpacity, y:startDivY}} transition={{duration:0.8}} className='h-1/3 w-1/2 bg-dark-blue rounded-3xl text-white fixed flex items-center justify-center'>
                  </motion.div>
                </motion.div>
              </div>
              <form onSubmit={(event) => {
                event.preventDefault();
                setLocation(inputRef.current)
               }}>
                <motion.input whileFocus={{scale:0.9}} type="text" onChange={(event) => {inputRef.current = event.target.value;}} onFocus={() => {setStartDivOpacity(1);setStartDivY(0)}} onBlur={() => {setStartDivOpacity(0);setStartDivY(-100)}} 
                  className='fixed bottom-0 left-0 mb-2 w-2/3 z-10'
                />
                <motion.button whileTap={{scale:0.8}} whileHover={{scale:1.01}} type='submit' className='fixed bottom-2 right-0 mb-0 mt-0 ml-20 w-1/4 bg-dark-blue z-10'>Submit</motion.button>
              </form>
            </div>

          )
        }
    }
}