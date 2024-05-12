<template>
  <section class="home">
    <v-container>
      <div class="heading">NoteIt.</div>
      <v-spacer />
      <div class="icon">
        <v-icon
          color="grey"
          icon="mdi-tag-outline"
          @click="showCategoryDialog = true"
          v-tooltip.bottom="'Categories'"
        >
        </v-icon>
      </div>

      <div class="icon">
        <v-icon
          color="grey"
          icon="mdi-archive-outline"
          v-tooltip.bottom="'Archive'"
        ></v-icon>
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <div class="icon">
            <v-icon
              color="grey"
              icon="mdi-filter-outline"
              v-bind="props"
              v-tooltip.bottom="'Filter'"
            ></v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in categories"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn ml-2 color="white" @click="showDialog = true"
        ><v-icon icon="mdi-plus" color="black"></v-icon>
        <span class="create-note-text"> Create Note </span>
      </v-btn>
    </v-container>

    <CreateNoteDialog v-model="showDialog" />
    <CreateCategoryDialog v-model="showCategoryDialog" />

    <v-container class="content">
      <div class="contentBlock">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="4"
            v-for="(item, index) in items"
            :key="index"
          >
            <v-card class="pa-4" outlined tile rounded>
              <!-- <v-btn
                size="20"
                icon
                class="ml-auto card-btn"
                @click.stop="showMenu = !showMenu"
              >
                <v-icon size="16">mdi-dots-vertical</v-icon>
              </v-btn> -->
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div class="card-btn">
                    <v-icon
                      color="grey"
                      icon="mdi-dots-vertical"
                      v-bind="props"
                    ></v-icon>
                  </div>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in menuItems" :key="index">
                    <div class="list-item">
                      <v-icon
                        color="grey"
                        size="16"
                        :icon="item.icon"
                        v-bind="props"
                      ></v-icon>
                      <v-list-item-title class="ml-3">{{ item.text }}</v-list-item-title>
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
              <div class="text-start">
                <div class="title">{{ item.title }}</div>
                <div class="description">{{ item.content }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CreateNoteDialog from "../components/CreateNoteDialog.vue";
import CreateCategoryDialog from "../components/CreateCategoryDialog.vue";
const showDialog = ref(false);
const showMenu = ref(false);
const showCategoryDialog = ref(false);
const categories = ["category1", "category2", "category3"];
const menuItems = [
  { id: 1, icon: "mdi-pencil-outline", text: "Edit" },
  { id: 2, icon: "mdi-archive-outline", text: "Archive" },
  { id: 3, icon: "mdi-delete", text: "Delete" },
];
const items = [
  {
    title: "Item 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Item 2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Item 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
  },
  {
    title: "Item 4",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Item 5",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Item 6",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
  },
  {
    title: "Item 7",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Item 8",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Item 9",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ",
  },
];
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(227, 54, 41, 1),
    rgba(130, 42, 219, 1)
  );
}

.v-container {
  display: flex;
  align-items: center;
  height: 10%;
  padding: 20px 10px;

  background-color: black;
}

.heading {
  font-weight: 500;
  font-size: 18px;
  color: white;
  margin-left: 6px;
}
.icon {
  cursor: pointer;
  margin-right: 10px;
}
.icon:hover .v-icon {
  color: white !important;
}

.content {
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  height: 80vh;
}

.contentBlock {
  overflow-y: scroll;
  display: flex;
  align-items: flex-start;
  height: 99%;
  overflow-x: hidden;
}

.contentBlock::-webkit-scrollbar {
  display: none;
}

.title {
  font-weight: 800;
  font-size: 20px;
}

.description {
  font-size: 18px;
  height: 180px;
  white-space: normal;
}

.create-note-text {
  display: none;
}

.cardContent {
  align-self: center;
  width: 95%;
}

.card-btn {
  display: flex;
  justify-content: flex-end;
}
.list-item {
  display: flex;
  align-items: center;
}

@media only screen and (min-width: 960px) {
  .create-note-text {
    display: inline-block;
  }
}
</style>
