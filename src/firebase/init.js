import firebase from 'firebase/app'
import firestore from'firebase/firestore'
// import 'firebase/functions'
// import 'firebase-admin'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


// Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyCb9hsYfKVfz6j93IO22djONyAClPNo604",
    authDomain: "project-time-chat.firebaseapp.com",
    databaseURL: "https://project-time-chat.firebaseio.com",
    projectId: "project-time-chat",
    storageBucket: "project-time-chat.appspot.com",
    messagingSenderId: "435886633074",
    appId: "1:435886633074:web:91d113bd86f0076724d2eb",
    measurementId: "G-2TT7BWJT4Q"
  };
  

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(config);
  export default  firebaseApp.firestore()
//   <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js"></script>

// <!-- TODO: Add SD[2020-07-13T14:39:43.688Z]  @firebase/firestore: Firestore (7.15.0): Could not reach Cloud Firestore backend. Connection failed 1 times. Most recent error: FirebaseError: [code=unknown]: Fetching auth token failed: getToken aborted due to token change.
//This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.Ks for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
/* <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-analytics.js"></script> */