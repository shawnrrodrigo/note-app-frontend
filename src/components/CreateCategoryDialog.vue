<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title>Categories</v-card-title>
      <div class="cardContent">
        <div class="card-list">
          <v-list>
            <v-list-item v-for="item in categories" :key="item.id">
              <v-list-item-content class="listItem">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-action class="delete-btn">
                  <v-icon color="grey" @click="deleteItem(item.id)"
                    >mdi-delete</v-icon
                  >
                </v-list-item-action>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <v-card-text>
          <v-text-field v-model="category" label="Category name"></v-text-field>
        </v-card-text>
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="addCategory">Add category</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import apiService from "../service";
import { useToast } from "vue-toastification";

const show = ref(false);

const category = ref("");
const toast = useToast();

const categories = ref([]);
const emits = defineEmits(["close-dialog"]);

const addCategory = async () => {
  try {
    const postData = {
      name: category.value,
    };
    await apiService.post("/category", postData);
    fetchCategoryData();
    category.value = "";
    toast.success("Category added Successfully", {
      timeout: 2000,
    });
  } catch (err) {
    toast.error("Something went wrong", {
      timeout: 2000,
    });
    console.error("Error adding category:", err);
  }
};

const deleteItem = async (categoryId) => {
  try {
    await apiService.delete(`/category/${categoryId}`);
    toast.success("Category deleted Successfully", {
      timeout: 2000,
    });
    fetchCategoryData();
  } catch (err) {
    toast.error("Something went wrong", {
      timeout: 2000,
    });
    console.error("Error deleting category:", err);
  }
};

const fetchCategoryData = async () => {
  try {
    const res = await apiService.get("/category");
    categories.value = res.data;
  } catch (err) {
    console.log(err);
  }
};

const closeDialog = () => {
  emits("close-dialog");
};

fetchCategoryData();
</script>

<style scoped>
.cardContent {
  max-height: 70vh;
}
.card-content::-webkit-scrollbar {
  width: 5px;
}

.card-content::-webkit-scrollbar-track {
  background: transparent;
}

.card-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.card-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
.card-list {
  max-height: 300px;
  overflow-y: scroll;
}
.card-list::-webkit-scrollbar {
  width: 5px;
}

.card-list::-webkit-scrollbar-track {
  background: transparent;
}

.card-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.card-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
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
