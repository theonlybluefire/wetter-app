import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeaderCell,  TableRow,} from '@tremor/react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { Scale } from "lucide-react";






export default (location) => {
    console.log(location.location,typeof location, typeof location.location)
    const geocodingQuery = useQuery({
        queryFn: () =>
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location.location}&count=10&language=en&format=json`).then((res) =>
                res.json(),
            ),
        queryKey: ['geocodingQuery',location]
    })

    if (geocodingQuery.isLoading) {
            return <div>Loading...</div>
    }
    if (geocodingQuery.error) {
        return <div>geocodingQuery.error</div>
        }

    const data = null
    console.log('Geocding Data',geocodingQuery.data)
    if(geocodingQuery.data) {
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
        console.log('Starting')
        if(geocodingQuery.data.results) {
            for(let i = 0;i<geocodingQuery.data.results.length;i++) {
                data.push(new TableObject(i))
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
                  {data.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <motion.button className="geocodingAddButton" onClick={() => {
                          window.localStorage.setItem('longitude',item.longitude)
                          window.localStorage.setItem('latitude',item.latitude)
                          console.log('set Coords to, stored in Local Storage as lontitude, latitude',item.longitude,item.latitude)
                          document.location.reload();
                      }}
                      whileHover={{boxShadow: "0 0 20px #3B82F6",scale:1.1}}
                      whileTap={{scale:0.5}}
                      >add</motion.button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )
        }
        else {
          return (
            <div className="noResults"></div>
          )
        }
    }
}