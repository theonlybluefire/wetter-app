import forecast from "./forecast"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import React from "react"
export default () => {
    const forecastQuery = useQuery({
        queryFn: () =>
        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m').then((res) =>
          res.json(),
        ),
        queryKey: ['forecastData']
    })
    if(forecastQuery.isLoading) {
        console.log('Query Loading')
        return (
            <div>
                <p>Loading.....</p>
            </div>
        )
    }
    else if(forecastQuery.isError) {
        console.log('Querry Error',forecastQuery.error)
        return(
            <div>Error</div>
            )
    }
    console.log(forecastQuery.data)
    return (
        <div>
            <p>Query Sucessfuly loaded</p>
        </div>
    )
}