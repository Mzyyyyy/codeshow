import login from './login'
import home from './home'
import edit from './edit'
import orther from './orther'
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

  }
]

export default user
