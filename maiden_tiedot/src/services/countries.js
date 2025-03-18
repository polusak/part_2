import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const request = axios.get(baseUrl)
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


export default { getAll, get, getFlag}