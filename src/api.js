import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL

export const getRepos = async () => {
  const response = await axios.get(`${API_URL}/gql`)
  return response.data
}
export const requestReviewer = async (username, pullRequest) => {
  const response = await axios.post(`${API_URL}/request-reviewer`, {
    username,
    pullRequest,
  })
  return response.data
}
export const requestReviewers = async (reviews) => {
  const response = await axios.post(`${API_URL}/request-reviewers`, reviews)
  return response.data
}
