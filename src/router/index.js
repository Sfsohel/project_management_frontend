import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Frontend-master/Login'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Backend-master/Sidebar'),
    redirect: { path:'/home/dashboard'},
    children:[
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Backend-master/Dashboard'),
      },
      {
        path: 'priority',
        name: 'priority',
        component: () => import('../views/Backend-master/configuration/Priority'),
      },
      {
        path: 'tracker',
        name: 'tracker',
        component: () => import('../views/Backend-master/configuration/Tracker'),
      },
      {
        path: 'task-status',
        name: 'status',
        component: () => import('../views/Backend-master/configuration/Status'),
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('../views/Backend-master/resources/Department'),
      }, 
      {
        path: 'designaiton',
        name: 'designaiton',
        component: () => import('../views/Backend-master/resources/Designation'),
      },
      {
        path: 'skill',
        name: 'skill',
        component: () => import('../views/Backend-master/resources/Skills'),
      }, 
      {
        path: 'resource',
        name: 'resource',
        component: () => import('../views/Backend-master/resources/Resources'),
      }, 
      {
        path: 'add-project',
        name: 'add-project',
        component: () => import('../views/Backend-master/projects/AddProjects'),
      },
      {
        path: 'all-project',
        name: 'all-project',
        component: () => import('../views/Backend-master/projects/Projects'),
      },
      {
        path: 'project-resources',
        name: 'project-resources',
        component: () => import('../views/Backend-master/projects/ProjectResource'),
      },
      {
        path: 'project-modules',
        name: 'project-modules',
        component: () => import('../views/Backend-master/projects/ProjectModules'),
      },
      {
        path: 'project-pages',
        name: 'project-pages',
        component: () => import('../views/Backend-master/projects/ProjectPages'),
      },
      {
        path: 'task-create',
        name: 'task-create',
        component: () => import('../views/Backend-master/task/Create.vue'),
      },
      {
        path: 'task',
        name: 'task',
        component: () => import('../views/Backend-master/task/AllTask.vue'),
      },
      {
        path: 'task-pending',
        name: 'task-pending',
        component: () => import('../views/Backend-master/task/PendingTask.vue'),
      },
      {
        path: 'task-details/:id',
        name: 'task-details',
        component: () => import('../views/Backend-master/task/TaskDetails.vue'),
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/Frontend-master/About')
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Frontend-master/Signup')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
