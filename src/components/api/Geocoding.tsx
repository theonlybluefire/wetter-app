import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeaderCell,  TableRow,} from '@tremor/react';
import { useQueryClient } from '@tanstack/react-query';







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
                console.log('datenb',data)
            }
        }
        else {
            data = [
                {
                    name:'',
                    region:'',
                    country:'',
                }
            ]
        }
    return (
        <div className="">
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
                <button onClick={() => {
                    window.localStorage.setItem('longitude',item.longitude)
                    window.localStorage.setItem('latitude',item.latitude)
                    console.log('set Coords to',item.longitude,item.latitude)
                }}>Test</button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
    }
}