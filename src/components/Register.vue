<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <h4 class="teal-text"> Register </h4>
          <div class="card-content center-align">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form id="form" action="#" @submit.prevent="submit">
              <div class="form-group row">
                <div class="input-field col s12">
                  <i class="material-icons prefix"> person </i>
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="User Name"
                    value
                    required
                    autofocus
                    v-model="name"
                  />
                  <label for="name" class="active" > Name </label>
                </div>
              </div>

              <div class="form-group row">
                <div class="input-field col s12">
                  <i class="material-icons prefix"> email </i>
                  <input
                    id="email"
                    type="email"
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
                    placeholder="User Password"
                    value
                    required
                    autofocus
                    v-model="password"
                  />
                  <label for="password" class="active"> Password </label>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                  <button type="button" @click="enterWelcome" class="btn btn-primary"> SignIn</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firestore from "../firebase/init"
import firebase from 'firebase/app'
import Toasted from 'vue-toasted'
import Vue from 'vue'

export default {
  data() {
    return {
        name: "",
        email: "",
        password: "",
        error: null
    };
  },
  methods: {
    async submit() {
      const userAuth = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          return firestore.collection("users").doc(data.user.uid).set({
            name: form['name'].value,
            email: form['email'].value,
            uid: firebase.auth().currentUser.uid
          })
          }).then( () => {

          this.$router.replace({ name: "Welcome", params: {displayName: this.name, email: this.email} });
          return firebase.auth().currentUser.updateProfile({
              displayName: form['name'].value
          })
          })
        .then(function() {
          console.log("seccessfully")
        })
        
        .catch(err => {
          this.error = err.message;
          var errCode = err.code
          var errMessage = err.message;
          if(errCode == "auth/weak-password") {
            Vue.toasted.error("Password is too weak", {
            theme: "toasted-primary", 
            position: "top-left", 
            duration : 5000,
            icon: "error_outline",
            action: {
              text: "close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
            })
          } else {
            Vue.toasted.error(errMessage, {
            theme: "toasted-primary", 
            position: "top-leftt", 
            duration : 5000,
            icon: "error_outline",
            action: {
              text: "close",
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
            })
          }
        });
    },
    enterWelcome() {
      this.$router.replace( { name: 'Welcome'})
    },
    writeUserData(user) {
    firebase.database().ref('users/' + user.uid).set(user).catch(error => {
        console.log(error.message)
    })
    }
  }
};
</script>

<style>
.teal-text {
  margin-left: 12px;
  padding-top: 12px;
}

.form-control {
  font-family: Helvetica, 'FontAwesome', sans-serif;
}
</style>