import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30px;

  > div {
    display: flex;

    > a:nth-child(2) {
      margin-left: 10px;
    }
  }
`

const User = ({ user }) => {
  return (
    <Container hasRepo={!!user.repo}>
      <span>{user.name}</span>
      <div>
        {user.repo && <a href={user.repo.html_url}>repo</a>}
        {user.repo && user.repo.pulls && user.repo.pulls.length > 0 && (
          <a href={user.repo.pulls[0].html_url}>pr</a>
        )}
      </div>
    </Container>
  )
}

export default User
