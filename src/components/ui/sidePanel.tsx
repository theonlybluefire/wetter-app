import React, { useEffect, useState, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import forecast from "../api/forecast"

export default () => {
    const {forecastQuery} = useQuery({
        queryFn: () =>
            fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Europe%2FBerlin').then((res) =>
                res.json(),
            ),
        queryKey: ['forecastData']
    })

    const [weather, setWeather] = useState<string>();
    const temperature = useRef<number>()

    console.log(forecastQuery.data, forecastQuery.isLoading, forecastQuery.error)

    useEffect(() => {
        if (forecastQuery.data) {
            if (forecastQuery.data.current.rain > 0) {
                setWeather('rain')
            } else if (forecastQuery.data.current.showers > 0) {
                setWeather('shower')
            } else if (forecastQuery.data.current.snowfall > 0) {
                setWeather('snow')
            } else {
                setWeather('normal')
            }
            temperature.current = Math.round(forecastQuery.data.current.apparent_temperature)
        }
    }, [forecastQuery.data])

    if (forecastQuery.isLoading) {
        return <div>Loading....</div>
    }

    return (
        <div className="background">
            <div className="weatherDisplay ">
                {weather}
            </div>
            <div className="temperatureDisplay">
                {temperature.current}
            </div>
        </div>
    )
}
