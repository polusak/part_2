import axios from 'axios'

const getAll = () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const request = axios.get(url)
  return request.then(response => {
    return response.data
  })
}

const get = name => {
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
    const request = axios.get(url)
    return request.then(response => {
        return response.data
    })
}

const getFlag = flagUrl => {
  const url = flagUrl
  const request = axios.get(url)
  return request.then(response => {
      return response.data
  })
}

const getCoordinates = city => {
  const baseUrl1 = `https://api.openweathermap.org/geo/1.0/direct?`
  const baseUrl2 = `q=${city}&limit=5&appid=`
  const apiKey = import.meta.env.VITE_SOME_KEY
  const request = axios.get(`${baseUrl1}${baseUrl2}${apiKey}`, 
    {headers: {
      "Content-Type": "application/json"
    }}
  )
  return request.then(response => {
      return response.data
  })
}

const getWeather = (latitude, longitude) => {
  const baseUrl = `https://api.open-meteo.com/v1/forecast?`
  const coords = `latitude=${latitude}&longitude=${longitude}&`
  const defs = `current=temperature_2m,wind_speed_10m,cloud_cover`
  const units = `&wind_speed_unit=ms`
  const request = axios.get(`${baseUrl}${coords}${defs}${units}`)
  return request.then(response => {
      return response.data
  })
}



export default { getAll, get, getFlag, getCoordinates, getWeather }