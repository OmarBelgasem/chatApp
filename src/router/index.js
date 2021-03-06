import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'
import found from '@/components/found'
import Register from '@/components/Register'
import friendList from '@/components/friendList'

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

   const routes = [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      props: true,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      meta: { requiresAuth: true }
      },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/friendList',
      name: 'friendList',
      component: friendList,
      meta: { requiresAuth: true }
    },
    {
      // will match everything
      path: '*',
      name: 'found',
      component: found
    }
  ]
//})

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next( { name: 'Welcome'} );
  } else {
    next();
  }
});

export default router;
