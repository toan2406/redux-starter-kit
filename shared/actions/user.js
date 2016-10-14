import { routeActions } from 'react-router-redux'

export function login () {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'GET_USER_SUCCESS', result: 'toan' })
      dispatch(routeActions.push('/protected'))
    }, 3000)
  }
}

export function fetchUsers () {
  return {
    type: 'FETCH_USERS'
  }
}

export function fetchOneUser ({ name }) {
  return {
    type: 'FETCH_ONE_USER',
    payload: name
  }
}
