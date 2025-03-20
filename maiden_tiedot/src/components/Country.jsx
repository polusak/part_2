import countryService from '../services/countries'
import { useState } from 'react'

const Country = ({country}) => {
    const [temperature, setTemperature] = useState("")
    const [clouds, setClouds] = useState("")
    const [wind, setWind] = useState("")

    if (country.capital !== "") {
        countryService
        .getCoordinates(country.capital)
        .then(result => {
            const latitude = result[0].lat
            const longitude = result[0].lon
            countryService
                .getWeather(latitude, longitude)
                .then(result => {
                    setTemperature(result.current.temperature_2m)
                    setClouds(result.current.cloud_cover)
                    setWind(result.current.wind_speed_10m)
                })
        })
    }

    return (
        <div>
            <h1>{country.name}</h1>
            Capital: {country.capital}<br />
            Area: {country.area}
            <h2>Languages</h2>
                {country.languages.map(language =>
                    <li key={language}>{language}</li>
                )}
            <br />
            <img
                src={country.flag}
            />

            <h2>Weather in {country.capital}</h2>
                Temperature {temperature} degrees Celsius
                <br />
                Cloud cover {clouds} %
                <br />
                Wind speed {wind} m/s


        </div>
    )
}

export default Country