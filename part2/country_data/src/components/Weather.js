import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)

    const weatherHook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)
            .then(res => {
                setWeather(res.data)
            })
    }

    useEffect(weatherHook, [])

    if (weather !== undefined && weather !== null) {
        return (
            <div>
                <h3>Weather in {country}</h3>
                <p>temperature: {weather.current.temperature}°C </p>
                <img src={weather.current.weather_icons[0]} alt="weather" />
                <p>wind: {weather.current.wind_speed} km/h</p>
            </div>
        )
    }

    return null   
}

export default Weather