import React from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const Container = styled.div`
  width: 400px;
  > div {
    padding: 10px;
  }
`

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: 10px;
  }
  > img {
    width: 50px;
  }
`

const User = ({ avatar_url, login }) => {
  return (
    <Container>
      <Paper elevation={3}>
        <UserHeader>
          <img src={avatar_url} alt="user-avatar"></img>
          <span>{login}</span>
        </UserHeader>
      </Paper>
    </Container>
  )
}

export default User
