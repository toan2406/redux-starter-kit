import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PostActions from '../actions/post'

@connect(
  (state, ownProps) => ({
    post: state.post,
    postId: ownProps.params.postId
  }),
  dispatch => ({ actions: bindActionCreators(PostActions, dispatch) })
)
class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    postId: PropTypes.string,
    actions: PropTypes.object.isRequired
  };
  static contextTypes = {
    isInit: PropTypes.bool
  };

  static needs = [
    PostActions.getOnePost
  ];

  componentDidMount () {
    const { isInit } = this.context
    const { post, postId, actions } = this.props
    const selectedPost = post.get('selectedPost')

    if (!isInit || selectedPost.isEmpty()) {
      actions.getOnePost({ postId })
    }
  }

  render = () => {
    const { post } = this.props
    const selectedPost = post.get('selectedPost')

    if (selectedPost.isEmpty()) {
      return (
        <div className='page'>Loading...</div>
      )
    }

    return (
      <div className='page'>
        <h1>{selectedPost.get('title')}</h1>
        <p>{selectedPost.get('body')}</p>
      </div>
    )
  };
}

export default Post
