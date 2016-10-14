import { Map } from 'immutable'

const INITIAL_STATE = Map({
  currentUser: null
})

export default function userReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return state.merge({
        currentUser: action.result
      })

    case 'FETCH_ONE_USER_FULFILLED':
      return state.merge({
        selectedUser: action.payload
      })

    default:
      return state
  }
}
