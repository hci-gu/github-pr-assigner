import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { reviewerForUsername } from '../state'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AssignedReviewer = ({ username }) => {
  const reviewer = useRecoilValue(reviewerForUsername(username))

  return (
    <Container>
      <span>assigned reviewer</span>
      {reviewer && <a href={reviewer.repo.html_url}>{reviewer.name}</a>}
      {!reviewer && <a href={`https://github.com/${username}`}>{username}</a>}
    </Container>
  )
}

export default AssignedReviewer
