import login from './login'
import home from './home'
import edit from './edit'
import orther from './orther'
import message from './message'
import tag from './tag'
const user = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/registry',
    name: 'registry',
    component: login
  },
  {
    path: '/user/home',
    name: 'home',
    component: home
  },
  {
    path: '/user/orther',
    name: 'orther',
    component: orther
  },
  {
    path: '/user/edit',
    name: 'edit',
    component: edit

  },
  {
    path: '/user/message',
    name: 'message',
    component: message

  },
  {
    path: '/user/tag',
    name: 'tag',
    component: tag
  }
]

export default user
