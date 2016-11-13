import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import * as PostActions from '../actions/post'
import * as UserActions from '../actions/user'
import ImageComponent from '../components/Image'
import ListComponent from '../components/List'
import { Grid, Row, Col } from 'react-flexbox-grid'

@connect(
  state => ({ post: state.post }),
  dispatch => ({
    actions: bindActionCreators(PostActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
    router: bindActionCreators(routeActions, dispatch)
  })
)
class Home extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  static contextTypes = {
    isInit: PropTypes.bool
  };

  static needs = [
    PostActions.getPosts
  ];

  componentDidMount () {
    const { isInit } = this.context
    const { post, actions } = this.props
    const posts = post.get('posts')

    if (!isInit || !posts.size) {
      actions.getPosts()
    }
  }

  _handleClickItem = (id) => {
    this.props.router.push(`/posts/${id}`)
  };

  render = () => {
    const { post } = this.props

    return (
      <div className='page'>
        <Grid>
          <Row>
            <Col xs={12} md={6}>Hello,</Col>
            <Col xs={12} md={6}>world!</Col>
          </Row>
        </Grid>
        <h1>Home page</h1>
        <ImageComponent
          src='/googlelogo.png'
          style={{
            width: 272,
            height: 92
          }}
        />
        <ListComponent
          dataSource={post.get('posts')}
          onClickItem={this._handleClickItem}
        />
      </div>
    )
  };
}

export default Home
