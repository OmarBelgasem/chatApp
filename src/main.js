// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import store from './store'
import 'firebase/firestore'
import 'firebase/auth'
import Toasted from "vue-toasted"

Vue.config.productionTip = false

Vue.use(Toasted)

let app;

firebase.auth().onAuthStateChanged( user => {
  console.log(user)
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
    })
  }
})

/* eslint-disable no-new */
// render: h => h(App)
//.$mount('#app')
