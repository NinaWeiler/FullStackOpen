import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
  //const nonExisting = {
  //  name: "Danny",
  //  number: 999,
  //  id: 90,
  //}
  //return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)

  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


const update = (id, newObject) => {
  console.log('personsjs id', id)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
} 


const personService = {getAll, create, update, remove}



export default personService;