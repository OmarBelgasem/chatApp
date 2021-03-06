<template>
<div>
  <div class="navbar">
<div class="left">
<img
        class="logo"
>
<span class="title">
        Chat
</span>
</div>
<div class="right">
<span class="welcome-message">
        Welcome <strong class="user-name"> {{ currentUserName }} </strong> 
</span>
<signOut class="right"></signOut>
</div>
</div>
  <div class="container">
    <div class="left">
    <div v-if="loading">
      <img
        src="https://reactnativeexample.com/content/images/2019/02/android-spinner.gif"
        class="center"
      />
    </div>
    <div v-else>
  <nav class="nav-fixed" style=" margin-top: 34px">
    <div class="nav-wrapper white">
      <a href="#" class="brand-logo center teal-text"> Friends </a>
    </div>
  </nav>
  <nav style="margin-top: 12px">
    <div class="nav-wrapper white">
      <form>
        <div class="input-field">
          <input id="search" type="search" required>
          <label class="label-icon" for="search"><i class="material-icons black-text">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
  <div class="row">
    <div class="shadow">
      <div class="col-sm-12">
        <div class="col-sm-8" style="cursor: pointer">
          <!-- <h4><a href="/chat"> {{ userName }} </a></h4>
          <button @click="getUserList"> click here!</button> -->
            <ul class="collection">
              <li class="collection-item avatar" 
                  v-on:click="letsChat(item)"
                  v-for="item in searchUsers"
                  :key="item.id"
                  v-show="item.uid != currentUserUid">
                <i class="material-icons circle"> person </i>
                <span class="title"> {{ item.name }} </span>
                <p>First Line<br>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
              </li>
            </ul>
        </div>
        </div>
  </div>
  </div>
</div>
</div>
<div class="right">
          <chat v-bind:currentPeerUser="currentPeerUser"/>
        </div>
        <button @click="search"> click here </button>
</div>
</div>
</template>

<script>
import firestore from "../firebase/init";
import firebase from 'firebase/app'
import Chat from "./Chat"
import signOut from "@/components/signOut"
import { mapState, mapGetters } from 'vuex'
//import * as admin from 'firebase-admin';
//import functions from 'firebase-functions'  
export default {
  data() {
    return {
      userName: '',
      loading: true,
      signIn: true,
      searchUsers: [],
      currentUserName: localStorage.getItem("name"),
      currentUserName: firebase.auth().currentUser.displayName,
      currentPeerUser: null,
      currentUserUid: firebase.auth().currentUser.uid,
      err: []
    }
  },
  components:{
    Chat,
    signOut
  },
  computed: {
    //...mapState([ currentPeerUser ]),
    // letsChat() {
    //   return this.$store.getters.letsChat
    // }

  },
  methods: {
    // getName: function() {
    //   var vueInstance = this;
    //   const user = firebase.auth().currentUser
    //   return setTimeout(function() {
    //     var userName = user.displayName
    //     vueInstance.$set(vueInstance, 'userName', userName);
    //     console.log('username:', userName)
    //   }, 2000);
    // },
    search() {
    // var ref = firebase.database().ref("users");
    // ref.orderByKey().on("child_added", function(snapshot) {
    // console.log(snapshot.key);
    firebase.database().ref('users').child('uid').orderByChild('name').on("value", function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function(data) {
        console.log(data.key);
    });
})},
    letsChat(item) {
      this.currentPeerUser = item
    },
    async getUserList() {
      const result = await firestore.collection("users").get()
      if(result.docs.length > 0) {
        let listUsers = []
        listUsers = [...result.docs]
        listUsers.forEach((item, index) => {
          this.searchUsers.push({
            key: index,
            documentKey: item.id,
            uid: item.data().uid,
            name: item.data().name,
            email: item.data().email
          })
          console.log(this.searchUsers)
        })
      }
    },

/**
 * Gets all the users (1000 MAX) from Firebase auth.
 *
 */// @param {Object} req Express Request Object.
 /*/// @param {Object} res Express Response Object
 //*///
// getAllUsers(req, res) { return
//   const functions = require('firebase-functions');
//   const admin = require('firebase-admin');
//   admin.initializeApp();
//   //const user = firebase.auth().currentUser
//   const maxResults = 1; // optional arg.

//   auth.listUsers(maxResults).then((userRecords) => {
//     userRecords.users.forEach((user) => console.log(user.toJSON()));
//     res.end('Retrieved users list successfully.');
//   }).catch((error) => console.log(error));
//   module.exports = {
//   api: functions.https.onRequest(getAllUsers)
// }
// }
listAllUsers(nextPageToken) {
  //var admin = require('firebase-admin');
  //var serviceAccount = require('./ServiceAccountKey.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-time-chat.firebaseio.com"
  })
  //const functions = firebase.functions()
  //const auth = admin.auth();
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
}
// Start listing users from the beginning, 1000 at a time.
  },
  async created() {
      //this.loading = false;
      const query = await firestore.collection("users").get();
      this.searchUsers = query.docs.map(doc => {return {...doc.data(), id: doc.id}});
      //this.getUserList()
      this.loading = false;
}
}
</script>

<style>
</style>