import matchPattern from 'lib/matchPattern'

const App = require('containers/App')
const Shell = require('containers/Shell')
const requiresAuth = require('higher-order-components/requiresAuth')
const loadHome = require('bundle?lazy&name=Home!containers/Home')
const loadPost = require('bundle?lazy&name=Post!containers/Post')
const loadAbout = require('bundle?lazy&name=About!containers/About')
const loadLogin = require('bundle?lazy&name=Login!containers/Login')
const loadProtectedPage = require('bundle?lazy&name=ProtectedPage!containers/ProtectedPage')
const childRoutes = [
  { component: Shell, path: '/shell' },
  { loadComponent: loadLogin, path: '/login' },
  { loadComponent: loadPost, path: '/posts/:postId' },
  { loadComponent: loadAbout, path: '/about' },
  { loadComponent: loadProtectedPage, path: '/protected', wrapper: c => requiresAuth(c) }
]

export default {
  path: '/',
  component: App,
  getChildRoutes (location, cb) {
    const route = childRoutes.find(({ path }) => matchPattern(path, location.pathname))
    if (route) {
      const { component, loadComponent, path, wrapper } = route
      if (typeof component !== 'undefined') {
        cb(null, route)
      } else {
        loadComponent(Component => {
          if (wrapper) {
            cb(null, { component: wrapper(Component), path })
          } else {
            cb(null, { component: Component, path })
          }
        })
      }
    }
  },
  getIndexRoute (location, cb) {
    loadHome((Home) => {
      cb(null, { component: Home })
    })
  }
}
