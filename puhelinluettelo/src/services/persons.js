import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => {
    return response.data
  })
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    console.log(response.data)
    return response.data
  })
}

export default { getAll, create, remove}