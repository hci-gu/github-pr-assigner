import React from 'react'
import styled from 'styled-components'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  githubReviewers,
  githubUsersNotAssignedOrReviewing,
  potentialReviewersState,
  usersWithOpenPrAndNoReviewer,
} from '../state'
import { shuffle, pickNonMatchFromArray, openPrForUser } from '../utils'
import * as api from '../api'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    margin: 5px;
  }
`

const Reviewers = () => {
  const usersNotAssignedOrReviewing = useRecoilValue(
    githubUsersNotAssignedOrReviewing
  )
  const [potentialReviewers, setPotentialReviewers] = useRecoilState(
    potentialReviewersState
  )
  const userRepos = useRecoilValue(usersWithOpenPrAndNoReviewer)
  console.log('reviewers')
  console.log(usersNotAssignedOrReviewing)
  console.log(potentialReviewers)

  const reviewersList = Object.keys(potentialReviewers).filter(
    (username) => potentialReviewers[username].value
  )
  // .filter((name) => !usersWhoAreReviewers.includes(name))

  console.log(reviewersList)

  const populateReviewers = () => {
    let users = shuffle(userRepos).map((u) => u.name)
    const mapped = Object.keys(potentialReviewers).reduce((acc, curr) => {
      if (potentialReviewers[curr].value) {
        acc[curr] = {
          ...potentialReviewers[curr],
          assigned: pickNonMatchFromArray(curr, users),
        }
      } else {
        acc[curr] = potentialReviewers[curr]
      }
      return acc
    }, {})

    setPotentialReviewers(mapped)
  }
  const assignReviewers = async () => {
    const reviews = Object.keys(potentialReviewers).reduce((acc, curr) => {
      if (potentialReviewers[curr].assigned) {
        const repoUser = userRepos.find(
          (u) => u.name === potentialReviewers[curr].assigned
        )
        const reviewerUser = userRepos.find((u) => u.name === curr)

        acc.push({
          reviewer: reviewerUser.repo.user,
          pr: openPrForUser(repoUser).url,
        })
      }
      return acc
    }, [])
    console.log(reviews)
    await api.requestReviewers(reviews)
  }

  const checkAll = () => {
    let users = userRepos.map((u) => u.name)
    const mapped = Object.keys(potentialReviewers).reduce((acc, curr) => {
      if (users.indexOf(curr) !== -1) {
        acc[curr] = {
          ...potentialReviewers[curr],
          value: true,
        }
      } else {
        acc[curr] = potentialReviewers[curr]
      }
      return acc
    }, {})
    setPotentialReviewers(mapped)
  }

  const clear = () => {
    setPotentialReviewers(
      Object.keys(potentialReviewers).reduce((acc, curr) => {
        acc[curr] = {
          value: false,
          assigned: null,
        }
        return acc
      }, {})
    )
  }

  return (
    <Container>
      <ul>
        {reviewersList.map((username) => (
          <li>{username}</li>
        ))}
      </ul>
      <button onClick={checkAll}>Check all with open PR</button>
      <button onClick={populateReviewers}>populate</button>
      <button onClick={assignReviewers}>assign</button>
      <button onClick={clear}>Clear</button>
    </Container>
  )
}

export default Reviewers
