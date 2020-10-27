import React from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import PullRequest from './PullRequest'

const Container = styled.div`
  > div {
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
`

const PullsContainer = styled.div`
  margin-top: 10px;
`

const Repo = ({ html_url, name, pulls }) => {
  return (
    <Container>
      <Paper elevation={3}>
        <a href={html_url} target="_blank" rel="noreferrer">
          {name}
        </a>
        Pull requests:
        <PullsContainer>
          {pulls.map((pr, i) => (
            <PullRequest pullRequest={pr} key={`PR_${i}`} />
          ))}
        </PullsContainer>
      </Paper>
    </Container>
  )
}

export default Repo
