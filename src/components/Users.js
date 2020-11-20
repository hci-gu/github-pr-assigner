import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { potentialReviewersState } from '../state'
import { DataGrid } from '@material-ui/data-grid'

import AssignedReviewer from './AssignedReviewer'
import ReviewerCheckbox from './ReviewerCheckbox'

export const Container = styled.div`
  width: 1400px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ${({ small }) => small && `width: calc(50% - 25px);`}
`

const PullRequest = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -25px;

  > a {
    height: 15px;
  }

  > a:nth-child(1) {
    ${({ state }) => state === 'OPEN' && `color: blue;`}
    ${({ state }) => state === 'MERGED' && `color: green;`}
    ${({ state }) => state === 'CLOSED' && `color: red;`}
  }
`

const renderPr = ({ value }) => {
  if (!value) {
    return <span>-</span>
  }
  return (
    <PullRequest state={value.state}>
      <a href={value.url}>{value.title}</a>
      {value.reviewRequests.length > 0 && (
        <AssignedReviewer username={value.reviewRequests[0].login} />
      )}
    </PullRequest>
  )
}

const columns = [
  {
    field: 'reviewer',
    width: 50,
    renderCell: (params) => (
      <ReviewerCheckbox username={params.data.username} />
    ),
  },
  {
    field: 'username',
    header: 'Username',
    width: 125,
    renderCell: (params) => {
      return (
        <a href={`https://github.com/gu-tig169/${params.value}`}>
          {params.value}
        </a>
      )
    },
  },
  {
    field: 'github',
    header: 'Github username',
    width: 200,
    renderCell: (params) => {
      return <a href={`https://github.com/${params.value}`}>{params.value}</a>
    },
  },
  { field: 'pr-1', header: 'Steg 1', width: 150, renderCell: renderPr },
  { field: 'pr-2', header: 'Steg 2', width: 150, renderCell: renderPr },
  { field: 'pr-3', header: 'Steg 3', width: 150, renderCell: renderPr },
  { field: 'pr-4', header: 'Steg 4', width: 150, renderCell: renderPr },
  { field: 'pr-5', header: 'Steg 5', width: 150, renderCell: renderPr },
  { field: 'openPR', header: 'openPR', width: 100 },
  { field: 'assign', header: 'Assign', width: 150 },
]

const mapUserToRow = (user, potentialReviewers) => {
  const pulls = user.repo ? user.repo.pullRequests : []
  const assigned = Object.keys(potentialReviewers).reduce((acc, curr) => {
    acc[potentialReviewers[curr].assigned] = curr
    return acc
  }, {})

  return {
    id: user.name,
    username: user.name,
    github: user.repo ? user.repo.user : '-',
    ...pulls.reduce((acc, pull) => {
      acc[`pr-${pull.number}`] = pull
      return acc
    }, {}),
    openPR: pulls.reduce((acc, pull) => {
      if (pull.state === 'OPEN') {
        acc = true
      }
      return acc
    }, false),
    assign: assigned[user.name],
    reviewer: potentialReviewers[user.name].value,
    disabled: false,
    raw: user,
  }
}

const Users = ({ selector, small = false, title }) => {
  const users = useRecoilValue(selector)
  const potentialReviewers = useRecoilValue(potentialReviewersState)

  return (
    <Container small={small}>
      {title && <h1>{title}</h1>}
      <DataGrid
        columns={columns}
        rows={users.map((u) => mapUserToRow(u, potentialReviewers))}
        loading={users.length === 0}
      ></DataGrid>
    </Container>
  )
}

export default Users
