<template>
  <v-dialog v-model="showEditNoteDialog" max-width="500px">
    <v-card>
      <v-card-title>Edit Note</v-card-title>
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
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="updateNote">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import apiService from "@/service";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  note: Object,
  categories: Array,
});

const showEditNoteDialog = ref(false);
const title = ref();
const id = ref();
const content = ref();
const category = ref();
const categories = ref();
const toast = useToast();

const emits = defineEmits(["close-dialog"]);

watch(
  () => props.note,
  (newValue) => {
    if (newValue) {
      (id.value = newValue.id), (title.value = newValue.title);
      content.value = newValue.content;
      category.value = newValue.category;
    } else {
      id.value = 0;
      title.value = "";
      content.value = "";
      category.value = "";
    }
  }
);

watch(
  () => props.categories,
  (newValue) => {
    if (newValue) {
      categories.value = newValue;
    } else {
      categories.value = [];
    }
  }
);

const updateNote = async () => {
  try {
    const noteId = id.value;
    const updateData = {
      title: title.value,
      content: content.value,
      category: category.value,
    };
    await apiService.put(`/note/${noteId}`, updateData);
    title.value = "";
    content.value = "";
    category.value = "";
    toast.success("Note updated Successfully", {
      timeout: 2000,
    });
    closeDialog();
  } catch (err) {
    toast.error("Something went wrong", {
      timeout: 2000,
    });
    console.error(err);
  }
};

const closeDialog = () => {
  emits("close-dialog");
};
</script>
