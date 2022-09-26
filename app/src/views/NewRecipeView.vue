<template>
  <main class="flex flex-col p-2">
    <h1 class="text-2xl">New Recipe</h1>
    <input type="text" id="title" v-model="title" placeholder="Title" class="input-primary my-1" />
    <input type="text" id="desc" v-model="desc" placeholder="Description" class="input-primary my-1" />
    <!-- <textarea id="ingredients" v-model="ingredients" placeholder="Ingredients"></textarea> -->
    <!-- <textarea id="directions" v-model="directions" placeholder="Directions"></textarea> -->
    <ul class="list-disc px-6">
      <li v-for="ingredient in ingredients" v-bind:key="ingredient">{{ ingredient }}</li>
    </ul>
    <div class="listInput my-1 flex">
      <input type="text" placeholder="Ingredient" v-model="newIngredient" class="input-primary w-full" />
      <button @click.prevent="addIngredient" class="btn-primary">+</button>
    </div>
    <ol class="list-decimal px-6">
      <li v-for="dir in directions" v-bind:key="dir">{{ dir }}</li>
    </ol>
    <div class="listInput my-1 flex">
      <input type="text" placeholder="Direction" v-model="newDirection" class="input-primary w-full" />
      <button @click.prevent="addDirection" class="btn-primary">+</button>
    </div>
    <button @click="submit" class="btn-primary my-1">Save</button>
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
        public: false,
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
