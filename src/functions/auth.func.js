import { api } from "src/api"
import sameStartRequest from "../helpers/axios"

const isBrowser = typeof window !== `undefined`

// returns user from local storage
const getUser = () =>
  window.localStorage.gatsbyUser
    ? JSON.parse(window.localStorage.gatsbyUser)
    : {}

// sets the user to local storage
export const setUser = user =>
  (window.localStorage.gatsbyUser = JSON.stringify(user))

export const getToken = () => {
  const { token = "" } = JSON.parse(window.localStorage.gatsbyUser)
  return token
}

// use this to check if the current user is logged in
export const isLoggedIn = () => {
  if (!isBrowser) return false

  const user = getUser()

  // check if the user has no token
  // this can be extended to check if the token has expired,
  // for token expiration (will need the server to send back token expiration timestamp)
  return !!user.token
}

// returns the currently logged in user
// use this when querying for current logged in user data (outputs user from local storage)
export const getCurrentUser = () => isBrowser && getUser()

export const getRole = () => {
  const { user: { role = "" } = {} } = getCurrentUser()
  return role
}

// logs out the user from localStorage
export const logout = callback => {
  if (!isBrowser) return
  // set the user the empty object
  const token = getToken()
  setUser({})
  callback()
  sameStartRequest(token)
    .post(api.getLogout())
    .then(() => {})
    .catch(e => {
      console.log(e)
    })
}

// use this as a callback function after a successful login request is made
// this will then save the user to local storage
export const onlogin = ({ user, token }, cb = () => false) => {
  setUser({ user, token })
  cb()
}
