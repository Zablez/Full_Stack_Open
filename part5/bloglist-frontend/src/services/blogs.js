import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, blogObj, config)

  return request.data
}


const likeBlog = async (blogObj) => {
  const { likes } = blogObj
  console.log(blogObj)
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.put(`${baseUrl}/${blogObj.id}`, { ...blogObj, likes: likes + 1 }, config)

  return request.data
}


const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)

  return request.data
}

export default { getAll, setToken, createBlog, likeBlog, deleteBlog }