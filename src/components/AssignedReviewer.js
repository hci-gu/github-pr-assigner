import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { reviewerForUsername } from '../state'

const AssignedReviewer = ({ username }) => {
  const reviewer = useRecoilValue(reviewerForUsername(username))

  if (reviewer) return <a href={reviewer.repo.url}>{reviewer.name}</a>

  return <a href={`https://github.com/${username}`}>{username}</a>
}

export default AssignedReviewer
