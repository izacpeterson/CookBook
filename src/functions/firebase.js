// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9EOSlnmGS-kseGdB2F9nOWG9UIlSBP_E",
  authDomain: "cookbook-769df.firebaseapp.com",
  projectId: "cookbook-769df",
  storageBucket: "cookbook-769df.appspot.com",
  messagingSenderId: "644720982505",
  appId: "1:644720982505:web:7ddfea4d742c26c2c23378",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function googleSignin() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        resolve(user);
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
        reject(error);
        // ...
      });
  });
}

export function getUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}

export function saveRecpie(recipe) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = await addDoc(collection(db, "recipes"), recipe);
      resolve(docRef.id);
    } catch (e) {
      reject(e);
    }
  });
}

export function getRecipes(publicRecipe, uid) {
  publicRecipe = publicRecipe === "true" ? true : false;
  console.log(uid);

  return new Promise(async (resolve, reject) => {
    const q = query(collection(db, "recipes"), where("public", "==", publicRecipe), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);

    const recipes = [];
    querySnapshot.forEach((doc) => {
      recipes.push(doc);
    });

    resolve(recipes);
  });
}

export function getRecipe(id) {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      resolve(docSnap.data());
    } else {
      reject();
    }
  });
}
