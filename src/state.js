import { atom, selector } from 'recoil'

export const refreshState = atom({
  key: 'refresh',
  default: new Date(),
})

export const usersState = atom({
  key: 'users',
  default: [],
})

export const reposState = atom({
  key: 'repos',
  default: [],
})

const shuffle = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

export const usersWithoutPr = selector({
  key: 'users-without-pr',
  get: ({ get }) => {
    const users = get(usersState)
    const repos = get(reposState)

    const usersAssignedToPR = []
    repos.forEach((r) => {
      r.pulls.forEach((p) => {
        p.requested_reviewers.forEach((requested) => {
          if (usersAssignedToPR.indexOf(requested) === -1)
            usersAssignedToPR.push(requested.login)
        })
      })
    })
    const filtered = users.filter((u) => !usersAssignedToPR.includes(u.login))

    return shuffle(filtered)
  },
})
