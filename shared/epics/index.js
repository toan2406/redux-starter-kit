import { combineEpics } from 'redux-observable'
import fetchOneUserEpic from './fetchOneUser'

const rootEpic = combineEpics(
  fetchOneUserEpic
)

export default rootEpic
