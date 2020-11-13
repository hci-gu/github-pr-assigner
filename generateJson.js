require('dotenv').config()

const shuffle = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

const users = shuffle(process.env.REACT_APP_USERS.split(','))

console.log(users)

let reviewers = shuffle(users)

let arr = users.reduce((acc, user) => {
  const reviewer = reviewers.find((u) => u !== user)
  acc.push({
    user,
    reviewer,
  })

  reviewers = reviewers.filter((u) => u !== reviewer)
  return acc
}, [])

// console.log(arr.map((u) => u.user).join(','))
// console.log(arr.map((u) => u.reviewer).join(','))

console.log(list.join(','))
