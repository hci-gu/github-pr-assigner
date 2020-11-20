import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import {
  reposState,
  refreshState,
  getUsers,
  usersWithReviewer,
  usersAssignedAsReviewers,
} from './state'
import { getRepos } from './api'
import Users from './components/Users'
import Reviewers from './components/Reviewers'

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;

  @media (max-width: 640px) {
    width: 100%;
  }
`

function App() {
  const [showAll, setShowAll] = useState(true)
  const [, setRepos] = useRecoilState(reposState)
  const [refresh] = useRecoilState(refreshState)

  useEffect(() => {
    const run = async () => {
      const _repos = await getRepos()
      setRepos(_repos)
    }
    run()
    return
  }, [refresh, setRepos])

  return (
    <>
      <button onClick={() => setShowAll(!showAll)} style={{ marginBottom: 10 }}>
        Toggle between all and filtered lists
      </button>
      {showAll ? (
        <Container>
          <Users key="users-all" selector={getUsers} />
          <Reviewers />
        </Container>
      ) : (
        <Container>
          <Users
            key="users-with-reviewer"
            small
            selector={usersWithReviewer}
            title="users with reviewer"
          />
          <Users
            key="users-assigned-as-reviewer"
            small
            selector={usersAssignedAsReviewers}
            title="users assigned as reviewer"
          />
        </Container>
      )}
    </>
  )
}

export default App
