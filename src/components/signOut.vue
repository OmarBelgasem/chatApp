<template>
  <div>
      <div v-if="loggedIn" @click="signOut" class='icon-container'>
      <img src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png" />
      <div class='status-circle'>
          <span> Yes </span>
      </div>
      </div>
      <span v-else > No </span>
      <div @click="signOut" class="material-icons">
          <span>
             power_settings_new
          </span>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    created() {
        firebase.auth().onAuthStateChanged( user => {
            this.loggedIn = !!user
        })
    },
data() {
    return {
        loggedIn: false
    }
},
methods: {
   async signOut(){
       try {
           const data = firebase.auth().signOut()
           console.log(data)
           this.$router.replace({name: "Welcome"})
       } catch(err) {
           console.log(err)
       }
    }
}
}
</script>

<style>
.icon-container {
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
}

img {
  height: 100%;
  /* width: 60%; */
  border-radius: 50%;
}

.status-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: green;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}
</style>