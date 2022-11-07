<script setup>
import { getUser, saveRecpie } from "../functions/firebase.js";
</script>
<template>
  <div class="flex flex-col">
    <label for="" class="m-2 flex items-center justify-between">Name: <input type="text" v-model="recipe.name" class="bg-gray-200 flex-1 m-2 p-2" /></label>
    <label for="" class="m-2 flex items-center justify-between">Author: <input type="text" v-model="recipe.author" class="bg-gray-200 flex-1 m-2 p-2" /></label>
    <label for="" class="m-2 flex flex-col justify-between">Description: <textarea type="text" v-model="recipe.description" class="bg-gray-200 p-2" /></label>
    <label for="">Ingredients:</label>
    <ul class="list-disc px-8">
      <li v-for="ingredient in recipe.ingredients" :key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <form @submit.prevent="addIngredient" class="m-2 flex">
      <input type="text" v-model="recipe.newIngredient" class="bg-gray-200 flex-1 p-2" />
      <button class="bg-primary p-2 text-white">Add</button>
    </form>
    <label for="">Directions:</label>
    <ol class="list-decimal px-8">
      <li v-for="step in recipe.directions" :key="step">
        {{ step }}
      </li>
    </ol>
    <form @submit.prevent="addStep" class="m-2 flex">
      <input type="text" v-model="recipe.newStep" class="bg-gray-200 flex-1 p-2" />
      <button class="bg-primary p-2 text-white">Add</button>
    </form>
    <button @click="addRecipe" class="bg-primary text-white">Submit</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recipe: {
        name: "",
        author: "",
        description: "",
        time: "",
        ingredients: [],
        directions: [],
        uid: "",
        public: false,
        newIngredient: "",
        newStep: "",
      },
      demoRecipe: {
        name: "Demo Recipe",
        author: "Izac",
        description: "This is a demo description",
        time: "3 hrs",
        ingredients: ["rice", "flour", "water", "milk"],
        directions: ["stir", "bake", "fry", "freeze", "serve"],
        uid: "",
        public: false,
      },
    };
  },
  methods: {
    addRecipe() {
      console.log(this.recipe);
      saveRecpie(this.recipe)
        .then((id) => {
          console.log(id);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addIngredient() {
      this.recipe.ingredients.push(this.recipe.newIngredient);
      this.recipe.newIngredient = "";
    },
    addStep() {
      this.recipe.directions.push(this.recipe.newStep);
      this.recipe.newStep = "";
    },
  },
  created() {
    const demo = false;
    if (demo) {
      this.recipe = this.demoRecipe;
    }
    getUser().then((user) => {
      console.log(user);
      this.recipe.uid = user.uid;
    });
  },
};
</script>
