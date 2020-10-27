import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`)
  return response.data
}
export const getRepos = async () => {
  const response = await axios.get(`${API_URL}/repos`)
  return response.data
}
export const requestReviewer = async (user, pullRequest) => {
  const response = await axios.post(`${API_URL}/request-reviewer`, {
    user,
    pullRequest,
  })
  return response.data
}
