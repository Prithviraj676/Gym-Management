import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import * as db from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// auth instance
const auth = getAuth(firebase);

const fs = db.getFirestore(firebase);

function createUser(name, username, email, password, phone) {



  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      // Signed in 
      console.log()
      var user = userCredential.user;
      console.log(user.email)

      db.setDoc(db.doc(fs, "User", user.uid), {
        'name': name,
        'username': username,
        'email': email,
        'phone': phone,
        'date': "01-03-2023",
        'plan': 'null',
        'subDate': 'null'
      }, { merge: true });

      // ...

    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });

}

function signInUser(email, password) {

  console.log('logging', email, password)

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(auth.currentUser.uid);
      var uid = auth.currentUser.uid;

      if (email.indexOf("@admin.com") !== -1) {
        console.log("one");
        window.location.href = "adminloggedin.html?uid=" + uid;

      }

      window.location.href = "selectplan.html?uid=" + uid;

      // Signed in 
      const user = userCredential.user;

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
}

export { createUser, signInUser, fs, db }
