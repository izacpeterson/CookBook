<template>
  <main>
    <h1>New</h1>
    <input type="text" id="title" v-model="title" placeholder="Title" />
    <input type="text" id="desc" v-model="desc" placeholder="Description" />
    <!-- <textarea id="ingredients" v-model="ingredients" placeholder="Ingredients"></textarea> -->
    <!-- <textarea id="directions" v-model="directions" placeholder="Directions"></textarea> -->
    <ul>
      <li v-for="ingredient in ingredients" v-bind:key="ingredient">{{ ingredient }}</li>
    </ul>
    <div class="listInput">
      <input type="text" placeholder="Ingredient" v-model="newIngredient" />
      <button @click.prevent="addIngredient">+</button>
    </div>
    <ol>
      <li v-for="dir in directions" v-bind:key="dir">{{ dir }}</li>
    </ol>
    <div class="listInput">
      <input type="text" placeholder="Direction" v-model="newDirection" />
      <button @click.prevent="addDirection">+</button>
    </div>
    <button @click="submit">Save</button>
  </main>
</template>
<script>
import { getUID } from "../functions/getUID";
export default {
  data() {
    return {
      title: "",
      desc: "",
      newIngredient: "",
      newDirection: "",
      ingredients: [],
      directions: [],
      uid: "",
    };
  },
  created() {
    getUID((uid) => {
      this.uid = uid;
    });
  },
  methods: {
    addIngredient() {
      this.ingredients.push(this.newIngredient);
      this.newIngredient = "";
    },
    addDirection() {
      this.directions.push(this.newDirection);
      this.newDirection = "";
    },
    async submit(e) {
      e.preventDefault();
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        title: this.title,
        desc: this.desc,
        ingredients: this.ingredients,
        directions: this.directions,
        uid: this.uid,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/api/new", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      this.title = "";
      this.desc = "";
      this.ingredients = "";
      this.directions = "";
    },
  },
};
</script>
<style>
main {
  display: flex;
  flex-direction: column;
}
input,
textarea {
  padding: 0.5rem;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0.3rem 0;
  border: none;
  background-color: #222;
  color: white;
  width: 100%;
}
textarea {
  height: 300px;
}
button {
  padding: 0.5rem;
  background-color: hsla(160, 100%, 37%, 1);
  border: none;
  margin: 0.3rem 0;
}
.listInput {
  width: 100%;
  display: flex;
}
</style>
