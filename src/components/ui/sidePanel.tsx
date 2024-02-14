import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import QueryApi from "../api/QueryApi"
export default () => {
    const [weather, setWheater] = useState<string>()
    const data = QueryApi();
    if(!data.isLoading) {
        if(data.current.rain > 0) {
            setWheater('Rain')
        }
        else if(data.current.showers > 0) {
            setWheater('Shower')
        }
        else if(data.current.snowfall > 0) {
            setWheater('Snow')
        }
        return (
            <div className="background">
                <div className="weatherDisplay">
                    {weather}
                </div>
                <div className="temperatureDisplay">
                    {Math.round(data.current.apparentTemperature)}
                </div>
            </div>
        ) 
    }
    if(data.isLoading) {
        return <div>Loading....</div>
    }

}