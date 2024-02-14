import React from "react"
import { useQuery } from "@tanstack/react-query"
export default (location) => {
    console.log(JSON.stringify(location))
    const geocodingQuery = useQuery({
        queryFn: () =>
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location.location}&count=10&language=en&format=json`).then((res) =>
          res.json(),
        ),
        queryKey: ['geocodingQuery']
    })
        if (geocodingQuery.isLoading) {
            return <div>Loading...</div>
        }
        if (geocodingQuery.error) {
            return <div>geocodingQuery.error</div>
        } 
    console.log('Geocding Data',geocodingQuery.data)
    return (
        <div>Query Sucess</div>
    ) 
}