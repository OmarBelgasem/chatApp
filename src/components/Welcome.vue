<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text"> {{ title }} </h2>
        <form @submit.prevent="enterChat()">
          <label for="name"> Enter your name: </label>
          <div class="form-group row">
                <div class="input-field col s12">
                  <i class="material-icons prefix"> email </i>
                  <input
                    id="email"
                    type="text"
                    class="form-control"
                    name="email"
                    placeholder="User Email"
                    value
                    required
                    autofocus
                    v-model="email"
                  />
                  <label for="email" class="active" > Email </label>
                </div>
              </div>

              <div class="form-group row">
                <div class="input-field col s12">
                  <i class="material-icons prefix"> vpn_key </i>
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="User Name"
                    value
                    required
                    autofocus
                    v-model="password"
                  />
                  <label for="password" class="active" > Password </label>
                </div>
              </div>
        
        <p v-if="feedback" class="red-text"> {{ feedback }} </p>
        <button class="btn teal"> Enter Chat</button>
        <button type="button" class="btn teal" @click="enterRegister"> Register </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firestore from '../firebase/init'
import firebase from 'firebase/app'
import { mapState } from 'vuex'

export default {
  name: 'Welcome',
  data () {
    return {
name: "",
email: "",
password: "",
feedback: null,
error: null
    }
  },
  computed: {
    ...mapState([ 'title' ])
  },
  methods: {
    // enterChat: function() {
    //   if(this.name && this.password) {
    //     this.$router.push( { name: 'Chat', params: { name: this.name, password: this.password } })
    //   } else {
    //     this.feedback = "you must enter your name and password"
    //   }
    // },
    
enterChat() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.$router.push( { name: 'friendList', params: { name: this.email, password: this.password }});
        })
        .catch(error => { 
          if(!this.email && !this.password) {
            this.feedback = " no user with this email or password"
          } else {
           this.feedback =  this.error = error.message
          }
        });
    },
    enterRegister() {
      this.$router.replace( { name: 'Register'})
    }
} }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.welcome {
  max-width: 400px;
  margin-top: 100px;
}
.welcome h2 {
  font-size: 3em;
}
.welcome button {
  margin: 30px auto;
}
</style>
