import { atom, selector, selectorFamily } from 'recoil'
const allUsers = process.env.REACT_APP_USERS

const shuffle = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

export const refreshState = atom({
  key: 'refresh',
  default: new Date(),
})
export const usersState = atom({
  key: 'users',
  default: allUsers.split(','),
})
export const reposState = atom({
  key: 'repos',
  default: [],
})

export const githubReviewers = selector({
  key: 'github-reviewers',
  get: ({ get }) => {
    const repos = get(reposState)

    return repos.reduce((acc, repo) => {
      let reviewers = []
      if (repo.pulls.length > 0) {
        repo.pulls.forEach((pull) => {
          reviewers = [...reviewers, ...pull.requested_reviewers]
        })
      }
      return [...acc, ...reviewers]
    }, [])
  },
})

export const reposMap = selector({
  key: 'repos-map',
  get: ({ get }) => {
    const repos = get(reposState)

    return repos.reduce((acc, repo) => {
      acc[repo.name.toLowerCase()] = {
        ...repo,
        user: repo.owner ? repo.owner.login : null,
      }
      return acc
    }, {})
  },
})

export const getUsers = selector({
  key: 'users-selector',
  get: ({ get }) => {
    const users = get(usersState)
    const repos = get(reposMap)

    return users.map((name) => ({
      name,
      repo: repos[name],
    }))
  },
})

export const usersWithReviewer = selector({
  key: 'users-with-reviewer-selector',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.filter((user) => {
      const userPr = user.repo && user.repo.pulls && user.repo.pulls[0]
      const assignedReviewer = userPr && userPr.requested_reviewers[0]
      return !!assignedReviewer
    })
  },
})

export const usersWithRepoAndPr = selector({
  key: 'users-with-repo-and-pr',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.filter((user) => {
      const userPr = user.repo && user.repo.pulls && user.repo.pulls[0]
      const assignedReviewer = userPr && userPr.requested_reviewers[0]
      return !!userPr && !assignedReviewer
    })
  },
})

export const usersWithRepoAndNoPr = selector({
  key: 'users-with-repo-and-no-pr',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.filter((user) => {
      const userPr = user.repo && user.repo.pulls && user.repo.pulls[0]
      return !!user.repo && !userPr
    })
  },
})

export const usersWithRepo = selector({
  key: 'users-with-repo',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.filter((user) => !!user.repo)
  },
})

export const usersWithoutRepo = selector({
  key: 'users-without-repo',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.filter((user) => !user.repo)
  },
})

export const usersAssignedAsReviewers = selector({
  key: 'users-assigned-as-reviewers',
  get: ({ get }) => {
    const users = get(getUsers)
    const reviewerGithubUsernames = get(githubReviewers).map(
      (reviewer) => reviewer.login
    )

    return users.filter(
      (user) => user.repo && reviewerGithubUsernames.includes(user.repo.user)
    )
  },
})

export const suggestedReviewers = selector({
  key: 'suggested-reviewers',
  get: ({ get }) => {
    const users = get(usersWithRepo)
    const reviewerUsernames = get(usersAssignedAsReviewers).map((u) => u.name)

    return shuffle(users.filter((u) => !reviewerUsernames.includes(u.name)))
  },
})

export const reposWithoutUser = selector({
  key: 'repos-without-user',
  get: ({ get }) => {
    const repos = get(reposState)
    const usernames = get(getUsers).map((u) => u.name)

    return repos.filter((repo) => !usernames.includes(repo.name.toLowerCase()))
  },
})

export const reviewerForUsername = selectorFamily({
  key: 'reviewer-for-username',
  get: (key) => ({ get }) => {
    const reviewers = get(usersAssignedAsReviewers)

    return reviewers.find((u) => u.repo.user === key)
  },
})
