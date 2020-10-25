import axios from 'axios'
const baseUrl = process.env.REACT_APP_API || ''
const apiUrl = baseUrl + '/api/users' || '/api/users'

// TODO add restriction to API based on token in header
const getAll = async () => {
    const response = await axios.get(apiUrl)
    return response.data
}

const getOne = async id => {
    const response = await axios.get(apiUrl + '/' + id)
    return response.data
}

export default { getAll, getOne }