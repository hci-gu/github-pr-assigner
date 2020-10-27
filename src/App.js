import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { usersState, reposState, refreshState } from './state'
import { getUsers } from './api'
import { getRepos } from './api'
import Repo from './components/Repo'

const Container = styled.div`
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  @media (max-width: 640px) {
    width: 100%;
  }
`

const ReposContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 20px;
`

function App() {
  const [users, setUsers] = useRecoilState(usersState)
  const [repos, setRepos] = useRecoilState(reposState)
  const [refresh] = useRecoilState(refreshState)

  useEffect(() => {
    const run = async () => {
      const _users = await getUsers()
      const _repos = await getRepos()

      setUsers(_users)
      setRepos(_repos)
    }

    run()
    return
  }, [refresh, setUsers, setRepos])
  console.log({ users, repos })

  return (
    <Container>
      <ReposContainer>
        {repos.map((repo, i) => (
          <Repo {...repo} key={`Repo_${i}`} />
        ))}
      </ReposContainer>
    </Container>
  )
}

export default App
