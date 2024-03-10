import React from "react";
import { useQuery } from "@tanstack/react-query"
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeaderCell,  TableRow,} from '@tremor/react';
import { motion } from "framer-motion";
import Loader from "./Loader";
export default (location) => { //main func
  //geocoding Query
  const geocodingQuery = useQuery({
        queryFn: () =>
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location.location}&count=10&language=en&format=json`).then((res) =>
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
              <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>
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
            </motion.div>
          )
        }
        else { //no result case
          return (
            <div className="h-20">
              <Loader/>
            </div>

          )
        }
    }
}