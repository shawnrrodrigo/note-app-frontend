<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>Categories</v-card-title>
      <div class="cardContent">
        <v-list>
          <v-list-item v-for="(item, index) in categories" :key="index">
            <v-list-item-content class="listItem">
              <v-list-item-title>{{ item }}</v-list-item-title>
              <v-list-item-action class="delete-btn">
                <v-icon color="black" @click="deleteItem(index)"
                  >mdi-delete</v-icon
                >
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-text>
          <v-text-field v-model="title" label="Category name"></v-text-field>
        </v-card-text>
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="saveNote">Add category</v-btn>
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
</script>

<style scoped>
.delete-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.listItem {
  display: flex;
  justify-content: space-between;
}
</style>
