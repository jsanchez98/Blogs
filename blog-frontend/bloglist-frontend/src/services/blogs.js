import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const addCommentToDB = async (comment, id) => {
  const config = {
    headers:{Authorization: token}
  }

  const response = await axios.post(`${baseUrl}/${id}`, {"comments": comment}, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers:{Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers:{Authorization: token}
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  setToken,
  clearToken,
  create,
  update,
  remove,
  addCommentToDB
}