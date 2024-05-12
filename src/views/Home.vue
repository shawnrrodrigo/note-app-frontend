<template>
  <section class="home">
    <div class="header">
      <div class="user">Hi <span>{{ user }}</span></div>
    </div>
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
          :color="showArchive ? 'white' : 'grey'"
          icon="mdi-archive-outline"
          @click="viewArchived"
          v-tooltip.bottom="'Archived'"
        ></v-icon>
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <div class="icon">
            <v-icon
              :color="selectedCategory ? 'white' : 'grey'"
              icon="mdi-filter-outline"
              v-bind="props"
              v-tooltip.bottom="'Filter'"
            ></v-icon>
          </div>
        </template>
        <div class="filter-list">
          <v-list>
            <v-list-item
              v-for="(item, index) in categories"
              :key="index"
              :value="index"
              @click="filterCategory(item)"
              :class="{ selected: selectedCategory === item }"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>

      <v-btn ml-2 color="white" @click="showDialog = true"
        ><v-icon icon="mdi-plus" color="black"></v-icon>
        <span class="create-note-text"> Create Note </span>
      </v-btn>
    </v-container>

    <v-container class="content">
      <div class="archive-heading">
        <span class="span-text" v-if="showArchive && items.length > 0">Archived Notes</span>
      </div>
      <div class="contentBlock" v-if="items.length > 0">
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
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div class="card-btn">
                    <v-chip> {{ item.category }} </v-chip>
                    <v-icon
                      color="grey"
                      icon="mdi-dots-vertical"
                      v-bind="props"
                    ></v-icon>
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="menuItem in menuItems"
                    :key="menuItem.id"
                    @click="handleCardItem(menuItem.id, item.id)"
                  >
                    <div class="list-item">
                      <v-icon
                        color="grey"
                        size="16"
                        :icon="menuItem.icon"
                      ></v-icon>

                      <v-list-item-title class="ml-3">{{
                        menuItem.text
                      }}</v-list-item-title>
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
      <div class="empty-block" v-if="items.length <= 0 && showArchive">
        <span class="empty-text">No archived notes to show</span>
      </div>
      <div class="empty-block" v-if="items.length <= 0 && !showArchive">
        <span class="empty-text">No notes to show</span>
      </div>
    </v-container>

    <CreateNoteDialog v-model="showDialog" @close-dialog="closeDialog" />
    <CreateCategoryDialog
      v-model="showCategoryDialog"
      @close-dialog="closeCategoryDialog"
    />
    <EditNoteDialog
      v-model="showEditDialog"
      :note="note"
      :categories="categories"
      @close-dialog="closeEditDialog"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import CreateNoteDialog from "../components/CreateNoteDialog.vue";
import CreateCategoryDialog from "../components/CreateCategoryDialog.vue";
import EditNoteDialog from "../components/EditNoteDialog.vue";

import apiService from "../service";

const showDialog = ref(false);
const showCategoryDialog = ref(false);
const showEditDialog = ref(false);
const categories = ref([]);
const showArchive = ref(false);
const note = ref();
const selectedCategory = ref(null);
const user = ref();
const toast = useToast();

const menuItems = [
  { id: 1, icon: "mdi-pencil-outline", text: "Edit" },
  { id: 2, icon: "mdi-archive-outline", text: "Archive" },
  { id: 3, icon: "mdi-delete", text: "Delete" },
];

const items = ref([]);

const handleCardItem = (index, id) => {
  switch (index) {
    case 1:
      editItem(id);
      break;
    case 2:
      archiveItem(id);
      break;
    case 3:
      deleteItem(id);
      break;
    default:
      break;
  }
};

const viewArchived = async () => {
  try {
    showArchive.value = !showArchive.value;
    const res = showArchive.value
      ? await apiService.get("/note/archived")
      : await apiService.get("/note");
    items.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const editItem = async (id) => {
  try {
    showEditDialog.value = true;
    const res = await apiService.get(`/note/${id}`);
    note.value = res.data;
  } catch (err) {
    toast.error("Something went wrong", {
      timeout: 2000,
    });
    console.error(err);
  }
};

const archiveItem = async (id) => {
  try {
    await apiService.patch(`/note/${id}`);
    viewArchived();
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (id) => {
  try {
    await apiService.delete(`/note/${id}`);
    toast.success("Note deleted Successfully", {
      timeout: 2000,
    });
    fetchItemData();
  } catch (err) {
    toast.error("Something went wrong", {
      timeout: 2000,
    });
    console.error(err);
  }
};

const fetchItemData = async () => {
  try {
    const res = await apiService.get("/note");
    items.value = res.data;
  } catch (err) {
    console.log(err);
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

const filterCategory = async (category) => {
  await fetchItemData();
  if (selectedCategory.value === category) {
    selectedCategory.value = null;
    return items.value;
  } else {
    selectedCategory.value = category;
    return (items.value = items.value.filter(
      (item) => item.category === category
    ));
  }
};

const fetchUserData = async () => {
  try{
    const res = await apiService.get("/user");
    user.value = res.data.name
    console.log("name", user.value);
  }catch(err){
    console.error(err);
  }
}

const closeDialog = () => {
  showDialog.value = false;
  fetchItemData();
};

const closeCategoryDialog = () => {
  showCategoryDialog.value = false;
  fetchCategoryData();
};

const closeEditDialog = () => {
  showEditDialog.value = false;
  fetchItemData();
};

fetchItemData();
fetchCategoryData();
fetchUserData();
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

.header {
  display: flex;
  justify-content: space-between;
}

.user{
  color: #000;
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
  display: block;
}

.contentBlock {
  overflow-y: scroll;
  display: flex;
  align-items: flex-start;
  height: 99%;
  width: 100%;
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
  align-items: center;
}
.list-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.filter-list {
  max-height: 50vh;
  overflow-y: scroll;
}

.filter-list::-webkit-scrollbar {
  width: 5px;
}

.filter-list::-webkit-scrollbar-track {
  background: transparent;
}

.filter-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.filter-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.selected {
  background-color: lightgrey;
}

.empty-block {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-text,
.span-text {
  color: rgb(213, 209, 209);
  font-size: 20px;
}

.archive-heading {
  display: flex;
  justify-content: center;
  margin-bottom: 6px;

}

.span-text {
  margin: auto;
}

@media only screen and (min-width: 960px) {
  .create-note-text {
    display: inline-block;
  }
}
</style>
