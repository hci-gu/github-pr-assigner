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
      <a href={reviewer.repo.html_url}>{reviewer.name}</a>
    </Container>
  )
}

export default AssignedReviewer
