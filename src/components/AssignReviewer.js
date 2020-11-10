import React, { useState } from 'react'
import styled from 'styled-components'
import { useRecoilValue, useRecoilState } from 'recoil'
import { suggestedReviewers, refreshState } from '../state'
import { MenuItem, InputLabel, Select } from '@material-ui/core'
import { requestReviewer } from '../api'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px;

  width: 100%;

  > button {
    margin: 5px 20px;
  }
`

const assignReviewerToPr = async (reviewer, pr) => {
  console.log(reviewer, pr)
  await requestReviewer(reviewer.repo.user, pr)
}

const AssignReviewer = ({ userPr }) => {
  const reviewers = useRecoilValue(suggestedReviewers)
  const [, setRefresh] = useRecoilState(refreshState)
  const [selectedReviewer, setSelectedReviewer] = useState('')

  return (
    <Container>
      <button
        disabled={!userPr}
        onClick={async () => {
          await assignReviewerToPr(selectedReviewer, userPr)
          setRefresh(new Date())
        }}
      >
        assign
      </button>
      {userPr && (
        <div>
          <InputLabel id="label">Reviewer</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={selectedReviewer}
            onChange={(e) => setSelectedReviewer(e.target.value)}
          >
            <MenuItem value={''} key={`SelectReviewer_empty`}>
              select reviewer
            </MenuItem>
            {reviewers.map((reviewer, i) => (
              <MenuItem value={reviewer} key={`SelectReviewer_${i}`}>
                {reviewer.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
    </Container>
  )
}

export default AssignReviewer
