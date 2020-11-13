import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { reposState, refreshState } from './state'
import { getRepos } from './api'
import Users from './components/Users'

const Container = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

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
    </Container>
  )
}

export default App
