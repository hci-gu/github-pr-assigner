import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import {
  usersWithReviewer,
  usersWithRepoAndPr,
  usersWithRepoAndNoPr,
  usersWithoutRepo,
} from '../state'
import { Paper } from '@material-ui/core'

import User from './User'
import AssignReviewer from './AssignReviewer'
import AssignedReviewer from './AssignedReviewer'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-top: 10px;
    width: 500px;
    display: flex;
    padding: 10px;

    justify-content: space-between;
  }
`

const UserList = ({ selector }) => {
  const users = useRecoilValue(selector)

  if (users.length === 0) {
    return <div>No users</div>
  }

  return users.map((user) => {
    const userPr = user.repo && user.repo.pulls && user.repo.pulls[0]
    const assignedReviewer = userPr && userPr.requested_reviewers[0]

    return (
      <Paper key={`User_${user.name}`}>
        <User user={user} />
        {!assignedReviewer ? <AssignReviewer userPr={userPr} /> : <div></div>}
        {assignedReviewer ? (
          <AssignedReviewer username={assignedReviewer.login} />
        ) : (
          <div></div>
        )}
      </Paper>
    )
  })
}

const Users = () => {
  return (
    <Container>
      <UserList selector={usersWithReviewer} />
      <h2>Can be assigned reviewer</h2>
      <UserList selector={usersWithRepoAndPr} />
      <h2>Needs to create PR</h2>
      <UserList selector={usersWithRepoAndNoPr} />
      <h2>Needs to create repository and PR</h2>
      <UserList selector={usersWithoutRepo} />
    </Container>
  )
}

export default Users
