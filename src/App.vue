<script setup>
import { RouterLink, RouterView } from "vue-router";
import NewRecipe from "./components/NewRecipe.vue";
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
</script>

<template>
  <header class="p-5 bg-back1 text-white flex justify-between">
    <h1 class="text-3xl text-white">Recipe Book</h1>
    <button @click="signIn" class="bg-primary text-white p-2">Sign in with Google</button>
  </header>
  <RouterView />
  <button @click="newRec = !newRec" class="bg-blue-500 text-white p-2">Add Recipe</button>
  <NewRecipe :uid="uid" v-if="newRec" @close="newRec = false" />
  <footer class="fixed bottom-0 w-full">
    <!-- {{ uid }} -->
  </footer>
</template>
<script>
const firebaseConfig = {
  apiKey: "AIzaSyD9EOSlnmGS-kseGdB2F9nOWG9UIlSBP_E",
  authDomain: "cookbook-769df.firebaseapp.com",
  projectId: "cookbook-769df",
  storageBucket: "cookbook-769df.appspot.com",
  messagingSenderId: "644720982505",
  appId: "1:644720982505:web:7ddfea4d742c26c2c23378",
};
const app = initializeApp(firebaseConfig);
export default {
  data() {
    return {
      newRec: false,
      uid: "",
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        this.uid = uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },
  methods: {
    signIn() {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
  },
};
</script>
