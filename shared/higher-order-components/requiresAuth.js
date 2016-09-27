import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export default function requiresAuth (Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      user: PropTypes.object,
      push: PropTypes.func
    }

    componentDidMount () {
      this._checkAndRedirect()
    }

    componentDidUpdate () {
      this._checkAndRedirect()
    }

    _checkAndRedirect = () => {
      const { user, push } = this.props
      if (!user.get('currentUser')) push('/login')
    }

    render () {
      return (
        <div>
          {this.props.user.get('currentUser') ? <Component {...this.props} /> : null}
        </div>
      )
    }
  }

  return connect(
    state => ({
      user: state.user
    }),
    dispatch => ({
      push: bindActionCreators(push, dispatch)
    })
  )(AuthenticatedComponent)
}
