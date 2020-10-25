import axios from 'axios'
const baseUrl = process.env.REACT_APP_API || ''
const apiUrl = baseUrl + '/api/blogs' || '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

// TODO add restriction to API based on token in header
const getAll = async () => {
    const response = await axios.get(apiUrl)
    return response.data
}

const getOne = async id => {
    const response = await axios.get(apiUrl + '/' + id)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(apiUrl, newObject, config)
    return response.data
}

const createComment = async (commentBody, blogId) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(`${apiUrl}/${blogId}/comments`, { commentBody, blogId } , config)
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${apiUrl}/${id}`, newObject)
    return response.data
}

const destroy = async id => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${apiUrl}/${id}`, config)
    return response.data
}

export default { getAll, setToken, create, createComment, update, destroy, getOne }