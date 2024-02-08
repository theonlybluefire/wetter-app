import forecast from "./forecast"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import React from "react"
export default () => {
    const forecastQuery = useQuery({
        queryFn: () => {forecast('Query API')},
        queryKey: ['forecastData']
    })
    if(forecastQuery.isLoading) {
        return (
            <div>
                <p>Loading.....</p>
            </div>
        )
    }
    else if(forecastQuery.isError) {
        return(
            <div>Error</div>
            )
    }
    return (
        <div>
            {forecastQuery.data.map(() => {
                
            })}
        </div>
    )
}