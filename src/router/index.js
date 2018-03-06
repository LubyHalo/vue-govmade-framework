import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/containers/Home'
import PasswordSetting from '@/views/PasswordSetting'
import Information from '@/views/Information'

Vue.use(Router)

const routerMap = [
  {
    path: '/',
    name: 'HomeIndex',
    component: Home,
    children: [
      { path: 'setting-password', name: 'changePassword', icon: 'speedometer', component: PasswordSetting },
      { path: 'information', name: 'information', icon: 'speedometer', component: Information }
    ]
  }
]

export default new Router({
  mode: 'history',
  routes: routerMap
})
