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

/*const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}*/

export default { 
  getAll: getAll, 
  create: create, 
  //update: update 
}