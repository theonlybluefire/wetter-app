import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import forecast from "../api/forecast"
export default () => {
    const forecastQuery = useQuery({
        queryFn: () =>
        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin').then((res) =>
          res.json(),
        ),
        queryKey: ['forecastData']
    })
    const [weather, setWheater] = useState<string>()
    console.log(forecastQuery.data,forecastQuery.isLoading,forecastQuery.error)
    if(forecastQuery.data) {
        if(forecastQuery.data.current.rain > 0) {
            useEffect(() => {
                setWheater('rain')
            },[])
        }
        else if(forecastQuery.data.current.showers > 0) {
            useEffect(() => {
                setWheater('shower')
            },[])
        }
        else if(forecastQuery.data.current.snowfall > 0) {
            useEffect(() => {
                setWheater('snow')
            },[])
        }
        else {
            useEffect(() => {
                setWheater('normal')
            },[])
        }
        console.log()
        return (
            <div className="background">
                <div className="weatherDisplay ">
                    {weather}
                </div>
                <div className="temperatureDisplay">
                    {Math.round(forecastQuery.data.current.apparent_temperature)}
                </div>
            </div>
        ) 
    }
    if(forecastQuery.isLoading) {
        return <div>Loading....</div>
    }

}