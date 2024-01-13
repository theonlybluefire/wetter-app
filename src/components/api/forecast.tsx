import { fetchWeatherApi } from 'openmeteo';
interface weatherDataTyp {
	current : {
		apparentTemperature: number;
		isDay:number;
		precipitation:number;
		rain: number;
		showers:number;
		snowfall:number;
		temperature2m:number;
		time: Date;
		windDirection10m:number;
		windSpeed10m:number;
	}
	hourly : {
		precipitation: Float32Array;
		precipitationProbability:Float32Array;
		temperature2m:Float32Array;
		time: Date[];
	}
}
export default async function () :Promise<weatherDataTyp> {
	const params = {
		"latitude": 48.189,
		"longitude": 10.0209,
		"current": ["temperature_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "wind_speed_10m", "wind_direction_10m"],
		"hourly": ["temperature_2m", "precipitation_probability", "precipitation"],
		"timezone": "Europe/Berlin"
	};
	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);
	
	// Helper function to form time ranges
	const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
	
	// Process first location. Add a for-loop for multiple locations or weather models
	const response = responses[0];
	
	// Attributes for timezone and location
	const utcOffsetSeconds = response.utcOffsetSeconds();
	const timezone = response.timezone();
	const timezoneAbbreviation = response.timezoneAbbreviation();
	const latitude = response.latitude();
	const longitude = response.longitude();
	
	const current = response.current()!;
	const hourly = response.hourly()!;
	
	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			temperature2m: current.variables(0)!.value(),
			apparentTemperature: current.variables(1)!.value(),
			isDay: current.variables(2)!.value(),
			precipitation: current.variables(3)!.value(),
			rain: current.variables(4)!.value(),
			showers: current.variables(5)!.value(),
			snowfall: current.variables(6)!.value(),
			windSpeed10m: current.variables(7)!.value(),
			windDirection10m: current.variables(8)!.value(),
		},
		hourly: {
			time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
				(t) => new Date((t + utcOffsetSeconds) * 1000)
			),
			temperature2m: hourly.variables(0)!.valuesArray()!,
			precipitationProbability: hourly.variables(1)!.valuesArray()!,
			precipitation: hourly.variables(2)!.valuesArray()!,
		},
	
	};
	//change time to better format
	// `weatherData` now contains a simple structure with arrays for datetime and weather data
	/*
	for (let i = 0; i < weatherData.hourly.time.length; i++) {
		console.log("Hourly",
			weatherData.hourly.time[i],//.toISOString()
			'Temperature',
			weatherData.hourly.temperature2m[i],
			'Niederschlagswahrscheinlichkeit',
			weatherData.hourly.precipitationProbability[i],
			'Niederschlag',
			weatherData.hourly.precipitation[i]
		);
	
	}
	*/
	
	
	return weatherData
}
