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
            setTable(
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
          </Table>)
        }
         return (
          <>
          <form onSubmit={(event) => {
            event.preventDefault();
            setLocation(inputRef.current)
           }}>
          <div>
            <div className='bg-rose-400 fixed bottom-5 flex w-full md:w-2/3 h-16'>
              <motion.input whileFocus={{scale:0.9}} type="text" onChange={(event) => {inputRef.current = event.target.value;}}
                className='left-2 mb-2 w-2/3 z-10'
              />
              <motion.button whileTap={{scale:0.8}} whileHover={{scale:1.01}} type='submit' className='bottom right-0 mb-0 mt-0 ml-20 w-1/4 bg-dark-blue z-10 h-12'>Submit</motion.button>
            </div>
          </div>
          </form>
          
          <div className='flex items-center overflow-auto'>
          <motion.div initial={{opacity:1}} animate={{height:'100%',width:'100%'}} transition={{duration:0.8}} className="md:h-1/3 md:w-1/2 h-full w-full bg-dark-blue rounded-3xl text-white flex items-center justify-center z-0 h-12">
           {table}
          <br/>
          <br/>
          <br/>
        </motion.div>
        </div>
        </>

          )
        }
    }
