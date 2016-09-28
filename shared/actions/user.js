import { routeActions } from 'react-router-redux'

export function login () {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'GET_USER_SUCCESS', result: 'toan' })
      dispatch(routeActions.push('/protected'))
    }, 3000)
  }
}
