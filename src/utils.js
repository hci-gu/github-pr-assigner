export const openPrForUser = (user) => {
  const repo = user.repo
  if (repo) {
    return repo.pullRequests.find((pr) => pr.state === 'OPEN')
  }
}

export const reviewerForUser = (user) => {
  const pr = openPrForUser(user)
  if (pr) {
    return pr && pr.reviewRequests[0]
  }
}

export const reviewersForRepoList = (repos) =>
  repos.reduce((reviewers, repo) => {
    return [
      ...reviewers,
      ...repo.pullRequests
        .filter((pr) => pr.state === 'OPEN')
        .reduce(
          (acc, pull) => [...acc, ...pull.reviewRequests.map((r) => r.login)],
          []
        ),
    ]
  }, [])

export const shuffle = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

export const pickNonMatchFromArray = (key, arr) => {
  const findFirstNonMatch = arr.findIndex((val) => val !== key)
  return arr.splice(findFirstNonMatch, 1)[0]
}
