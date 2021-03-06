<template>
  <div class="container-chat">
    <div v-if="loading" class="loading-messages">
      <spinner/>
<span class="loading-title">
        Loading Messages...
</span>
    </div>
<!-- End of Loading Messages State -->

<!-- Empty State -->
    <div
      v-else-if="messages.length === 0"
      class="empty-state"
    >
      <img
        class="empty-state-image"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQizhnLCKYvZiwAvQO55AXvt3ZcpLS7ykGMaw&usqp=CAU"
      >
      <h2 class="empty-state-title">
        No new message?
      </h2>
         <span class="empty-state-description">
            Send your first message below.
         </span>
     </div>
     <div v-else-if="messages.length > 0">
   <div class="navbar">
         <!-- <h2 class="center #78909c blue-grey-text lighten-1"> {{ currentPeerUser.name }} </h2> -->
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
          <strong class="user-name"> {{ currentPeerUser.name }} </strong> 
      </span>
      </div>
      </div>
  </div>
    <div else class="chat-messages">
        <Message
          :class="msg.idFrom === currentUserId ? 'outgoing': 'incoming'"
          v-for="msg in this.sortedMsgs"
          :key="msg.id"
          :text="msg.text"
          :time="msg.time"
          :name="msg.name"
        />
        <div class="card-action">
          <NewMessage @onSubmit="onSubmit" />
        </div>
      </div>
    </div>
</template>
<script>
import NewMessage from "@/components/NewMessage";
import Message from "./Message";
import Register from "@/components/Register"
import spinner from '@/components/spinner'
import firestore from "../firebase/init"
import firebase, { auth } from 'firebase/app'
import moment from "moment"


export default {
  name: "Chat",
  props: ["name","currentPeerUser", "currentUserUid"],
  components: {
    NewMessage,
    Message,
    Register
  },
  data() {
    return {
      loading: true,
      messages: [],
      currentUserId: firebase.auth().currentUser.uid,
      displayName: firebase.auth().currentUser.displayName,
      groupChatId: null,
    };
  },
  watch: {
    currentPeerUser: function(newVal, oldVal) {
      if(newVal !== oldVal) {
        this.getMessages()
      }
    }
  },
  methods: {
    onSubmit: async function (label) {
      var user = firebase.auth().currentUser;
      const timestamp = moment().valueOf().toString()
      //const querys =  await firestore.collection("users").doc(user.uid).get()
      const msg = {
        text: label,
        time: firebase.firestore.Timestamp.now(),
        name: user.displayName,
        idFrom: firebase.auth().currentUser.uid,
        idTo: this.currentPeerUser.uid,
        timestamp: timestamp,
      };
        // await firebase.auth().currentUser.updateProfile(msg);
        // const snap = await firestore.collection("messages").where('from', '==', firebase.auth().currentUser.uid).where('to', '==', this.currentPeerUser.uid).get();
        // let data = snap.docs.map(doc => doc.data());
        // const snap2 = await firestore.collection("messages").where('from', '==', this.currentPeerUser.uid).where('to', '==', firebase.auth().currentUser.uid).get();
        // data = [...data, ...snap2.map(doc => doc.data())];this.currentPeerUser.uid
        // await firestore.collection('messages').add(msg);
        const doc = await firestore.collection("messages").doc(this.groupChatId).collection(this.groupChatId).doc(timestamp).set(msg).then( () => {
        this.text = ""
        //this.messages.push({...msg});
      }).catch( err => {
        console.log(err)
      })
      },
      //this.messages.push({...msg, id});
    //},
    async getMessages() {
      this.messages = [];
      this.currentPeerUser
      let groupChatId = `${this.currentPeerUser.uid} + ${firebase.auth().currentUser.uid}`
      firebase.firestore().collection("messages").doc(groupChatId).collection(groupChatId).onSnapshot(Snapshot => {
        if(Snapshot.docChanges().length > 0) {
          this.groupChatId = groupChatId
          Snapshot.docChanges().forEach( res => {
            this.messages.push(res.doc.data())
          })
        } else {
          this.groupChatId = `${firebase.auth().currentUser.uid} + ${this.currentPeerUser.uid}`
          firebase.firestore().collection("messages").doc(this.groupChatId).collection(this.groupChatId).onSnapshot(Snapshot => {
            Snapshot.docChanges().forEach( res => {
              if(res.type === "added") {
                this.messages.push(res.doc.data())
              }
            })
          })
        }
      })
      console.log(this.currentPeerUser.uid)
    }
  },
  computed: {
      sortedMsgs() {
         return this.messages.sort((a, b) => a.time.toDate() - b.time.toDate())
      }
  },
  mounted() {
    this.getMessages()
  },
  created: async function(){
      // const query = await firestore.collection("messages").get();
      // this.messages = query.docs.map(doc => {return {...doc.data(), id: doc.id}});
      this.loading = false;
  },
};
</script>

<style>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px }
.empty-state-title {
  font-family: 'Abril Fatface', cursive;
  font-weight: normal;
  font-size: 26px;
  line-height: 35px;
  text-align: center;
  color: #1B47DB;
  margin: 15px 0}
.empty-state-description {
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #2D313F;
  mix-blend-mode: normal;
  opacity: 0.8}
.navbar {
  height: 50px;
  width: 100%;
  background: #FFFFFE;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto', sans-serif}
.left, .right {
  display: flex;
  justify-content: center;
  align-items: center}
.logo {
  margin-right: 10px}
.title {
  color: #2D313F;
  font-family: 'Abril Fatface', cursive;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px}
.welcome-message {
  margin-right: 10px}
.user-name {
  font-weight: 600}
.loading-messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;}
</style>