import { createRouter, createWebHashHistory } from 'vue-router';
import LayoutDefault from '~layouts/LayoutDefault';

const routes = [
  {
    path: '/',
    component: LayoutDefault,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('~views/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('~views/About.vue')
      }
    ]
  },
  {
    path: '/bsod',
    name: 'bsod',
    component: () => import('~views/Bsod.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
