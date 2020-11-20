import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { reposState, refreshState } from './state'
import { getRepos } from './api'
import Users from './components/Users'
import Reviewers from './components/Reviewers'

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;

  @media (max-width: 640px) {
    width: 100%;
  }
`

function App() {
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
    <Container>
      <Users />
      <Reviewers />
    </Container>
  )
}

export default App
