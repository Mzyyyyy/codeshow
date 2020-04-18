import write from './write'
import read from './read'
import config from './config'
import test from './test'
const index = [
  {
    path: '/write',
    name: 'write',
    component: write
  },
  {
    path: '/read',
    name: 'read',
    component: read
  },
  {
    path: '/config',
    name: 'config',
    component: config
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
]

export default index
