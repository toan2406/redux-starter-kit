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

    default:
      return state
  }
}
