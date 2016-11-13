import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs/Observable'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { mergeMap } from 'rxjs/operator/mergeMap'
import { switchMap } from 'rxjs/operator/switchMap'
import { map } from 'rxjs/operator/map'

export default function fetchOneUserEpic (action$) {
  return action$.ofType('FETCH_ONE_USER')
    ::switchMap(action =>
      Observable::fromPromise(fetch(`http://api.github.com/users/${action.payload}`))
        ::mergeMap(res =>
          Observable::fromPromise(res.json())
        )
        ::map(payload => ({ type: 'FETCH_ONE_USER_FULFILLED', payload: payload.login }))
    )
}
