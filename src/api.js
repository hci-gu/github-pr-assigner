import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const getRepos = async () => {
  const response = await axios.get(`${API_URL}/repos`)
  return response.data
}
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events/repo-created`)
  return response.data
}
export const requestReviewer = async (username, pullRequest) => {
  const response = await axios.post(`${API_URL}/request-reviewer`, {
    username,
    pullRequest,
  })
  return response.data
}
