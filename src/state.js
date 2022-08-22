import { atom, selector, selectorFamily } from 'recoil'
import { openPrForUser, reviewersForRepoList, reviewerForUser } from './utils'
const allUsers = process.env.REACT_APP_USERS

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
export const potentialReviewersState = atom({
  key: 'potential-reviewers',
  default: allUsers.split(',').reduce((acc, username) => {
    acc[username] = {
      value: false,
      assigned: null,
    }
    return acc
  }, {}),
})

export const githubReviewers = selector({
  key: 'github-reviewers',
  get: ({ get }) => {
    const repos = get(reposState)

    return reviewersForRepoList(repos)
  },
})

export const githubUsersNotAssignedOrReviewing = selector({
  key: 'github-not-assigned-or-reviewing',
  get: ({ get }) => {
    const allUsers = get(getUsers)
    const reviewers = get(githubReviewers)

    return allUsers.filter((user) => {
      const username = user.repo ? user.repo.user : undefined
      return !reviewers.includes(username)
    })
  },
})

export const reposMap = selector({
  key: 'repos-map',
  get: ({ get }) => {
    const repos = get(reposState)

    return repos.reduce((acc, repo) => {
      acc[repo.name.toLowerCase()] = {
        ...repo,
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

export const getAllGithubUsers = selector({
  key: 'github-usernames-selector',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.map((user) => user.repo && user.repo.user)
  },
})

export const usersWithReviewer = selector({
  key: 'users-with-reviewer-selector',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.filter((user) => {
      console.log(user, reviewerForUser(user))
      return !!reviewerForUser(user)
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

export const usersWithOpenPrAndNoReviewer = selector({
  key: 'users-with-open-pr-no-reviewer',
  get: ({ get }) => {
    const users = get(getUsers)

    return users.filter((user) => {
      const pr = openPrForUser(user)
      const reviewer = reviewerForUser(user)
      return !!pr && !reviewer
    })
  },
})

export const usersAssignedAsReviewers = selector({
  key: 'users-assigned-as-reviewers',
  get: ({ get }) => {
    const users = get(getUsers)
    const reviewerGithubUsernames = get(githubReviewers)
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

    return users.filter((u) => !reviewerUsernames.includes(u.name))
  },
})

export const reviewerForUsername = selectorFamily({
  key: 'reviewer-for-username',
  get:
    (key) =>
    ({ get }) => {
      const reviewers = get(usersAssignedAsReviewers)

      return reviewers.find((u) => u.name === key)
    },
})

export const debugSelector = selector({
  key: 'debug-selector',
  get: ({ get }) => {
    const reviewers = get(usersAssignedAsReviewers)
  },
})
