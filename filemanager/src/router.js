import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import SchemaView from './pages/ViewSchema.vue'
import XMLView from './pages/ViewXML.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/schema', component: SchemaView },
    { path: '/xml', component: XMLView },
  ]
})
