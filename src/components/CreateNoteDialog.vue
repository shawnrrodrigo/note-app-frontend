<template>
  <v-dialog v-model="show" max-width="500px">
    <!-- <template v-slot:activator="{ on }"></template> -->
    <v-card>
      <v-card-title>Create Note</v-card-title>
      <div class="cardContent">
        <v-card-text>
          <v-text-field v-model="title" label="Title"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-textarea v-model="content" label="Content"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-select
            v-model="category"
            :items="categories"
            label="Category"
          ></v-select>
        </v-card-actions>
      </div>
      <v-card-actions>
        <v-btn @click="addCategory">
          <v-icon>mdi-plus</v-icon>
          <span> Add category </span>
        </v-btn>
        <v-spacer />
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="saveNote">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const show = ref(false);

const title = ref("");
const content = ref("");
const category = ref("");
const categories = ["Category 1", "Category 2", "Category 3"];

// const openDialog = () => {
//   show.value = true;
// };

// const closeDialog = () => {
//   show.value = false;
// };


</script>

<style scoped>
.cardContent {
  align-self: center;
  width: 95%;
}
</style>
