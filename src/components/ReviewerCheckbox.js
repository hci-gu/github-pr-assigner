import React from 'react'
import styled from 'styled-components'
import { useRecoilValue, useRecoilState } from 'recoil'
import { potentialReviewersState, reviewerForUsername } from '../state'

const ReviewerCheckbox = ({ username }) => {
  const [potentialReviewers, setPotentialReviewers] = useRecoilState(
    potentialReviewersState
  )
  const reviewer = useRecoilValue(reviewerForUsername(username))

  const onToggle = () => {
    setPotentialReviewers({
      ...potentialReviewers,
      [username]: {
        ...potentialReviewers[username],
        value: !potentialReviewers[username].value,
      },
    })
  }

  return (
    <input
      type="checkbox"
      onClick={() => onToggle()}
      checked={potentialReviewers[username].value}
      disabled={!!reviewer}
    />
  )
}

export default ReviewerCheckbox
