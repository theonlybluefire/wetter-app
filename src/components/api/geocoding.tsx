import React from "react";
export default async (search) => {
    //get data from the api
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=de&format=json`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => console.log(JSON.stringify(response)))
}