<template>
  <v-dialog v-model="showCreateNoteDialog" max-width="500px">
    <v-card>
      <v-card-title>Create Note</v-card-title>
      <div class="cardContent">
        <v-card-text>
          <v-text-field
            v-model="title"
            label="Title"
            :rules="[
              (v) =>
                (v || '').length <= 50 || 'Title must be 50 characters or less',
            ]"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-textarea
            v-model="content"
            label="Content"
            :rules="[
              (v) =>
                (v || '').length <= 200 ||
                'Content must be 200 characters or less',
            ]"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-select
            v-model="category"
            :items="categories"
            label="Category"
            required
          ></v-select>
        </v-card-actions>
      </div>
      <v-card-actions>
        <v-btn @click="showCategoryDialog = true">
          <v-icon>mdi-plus</v-icon>
          <span class="hidden-xs-only"> Add category </span>
        </v-btn>
        <v-spacer />
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="saveNote">Create</v-btn>
      </v-card-actions>
    </v-card>

    <CreateCategoryDialog
      v-model="showCategoryDialog"
      @close-dialog="closeCategoryDialog"
    />
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

import CreateCategoryDialog from "./CreateCategoryDialog.vue";
import apiService from "../service";

const showCreateNoteDialog = ref(false);
const showCategoryDialog = ref(false);

const title = ref("");
const content = ref("");
const category = ref("");
const categories = ref([]);

const emits = defineEmits(["close-dialog"]);
const toast = useToast();

const closeDialog = () => {
  emits("close-dialog");
};

const saveNote = async () => {
  try {
    const postData = {
      title: title.value,
      content: content.value,
      category: category.value,
    };
    await apiService.post("/note", postData);
    title.value = "";
    content.value = "";
    category.value = "";
    toast.success("Note created succesfully", {
      timeout: 2000,
    });
    closeDialog();
  } catch (err) {
    toast.error("Something went wrong", {
      timeout: 2000,
    });
    console.error("Error saving note:", err);
  }
};

const fetchCategoryData = async () => {
  try {
    const res = await apiService.get("/category");
    categories.value = res.data.map((category) => category.name);
  } catch (err) {
    console.log(err);
  }
};

const closeCategoryDialog = () => {
  showCategoryDialog.value = false;
  fetchCategoryData();
};

fetchCategoryData();
</script>

<style scoped>
.cardContent {
  align-self: center;
  width: 95%;
}

@media (max-width: 400px) {
  .hidden-xs-only {
    display: none;
  }
}
</style>
