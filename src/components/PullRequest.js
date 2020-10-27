import React from 'react'
import styled from 'styled-components'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import * as api from '../api'

import { refreshState, usersWithoutPr } from '../state'
import User from './User'

const Container = styled.div`
  > div {
    padding: 10px;

    display: flex;
    flex-direction: column;
  }
`

const AssignReviewer = ({ pullRequest }) => {
  const availableUsers = useRecoilValue(usersWithoutPr)
  const [, setRefresh] = useRecoilState(refreshState)

  const onAssign = async (e) => {
    const user = e.target.value
    const success = await api.requestReviewer(user, pullRequest)
    if (success) {
      setRefresh(new Date())
    }
  }

  return (
    <FormControl variant="outlined">
      <InputLabel id="select-label" style={{ marginTop: 20 }}>
        Assign reviewer
      </InputLabel>
      <Select
        labelId="select-label"
        onChange={onAssign}
        value=""
        label="Assign reviewer"
        style={{ width: 225, marginTop: 20 }}
      >
        <MenuItem value="">
          <em>Cancel</em>
        </MenuItem>
        {availableUsers.map((u, i) => (
          <MenuItem value={u} key={`MenuItem_${i}`}>
            {u.login}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const PullRequest = ({ pullRequest }) => {
  let users = []
  if (pullRequest.requested_reviewers.length > 0) {
    users = pullRequest.requested_reviewers
  }

  return (
    <Container>
      <Paper elevation={3}>
        <a href={pullRequest.html_url} target="_blank" rel="noreferrer">
          {pullRequest.title}
        </a>
        <div>
          <div>
            {users.length < 2 && <AssignReviewer pullRequest={pullRequest} />}
          </div>
          <span>Reviewers:</span>
          {users.map((u, i) => (
            <User key={`User_${i}`} {...u} />
          ))}
        </div>
      </Paper>
    </Container>
  )
}

export default PullRequest
