import dashboard from './dashboard'
import chat from './chat'
import hot from './hot'
const index = [
  {
    path: '/index',
    name: 'index',
    component: dashboard
  },
  {
    path: '/chat',
    name: 'indchatex',
    component: chat
  },
  {
    path: '/hot',
    name: 'hot',
    component: hot
  }
]

export default index
