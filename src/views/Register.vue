<template>
  <section class="login">
    <v-container>
      <div class="heading">NoteIt.</div>
    </v-container>
    <v-card>
      <v-card-title>Create Account</v-card-title>
      <div class="text-fields">
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password"></v-text-field>
        <v-btn class="login-btn" color="black" @click="register"
          >Create Account</v-btn
        >
      </div>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="goToLogin">Login</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiService from "@/service";
import { useToast } from "vue-toastification";

const router = useRouter();
const name = ref();
const username = ref();
const password = ref();

const toast = useToast();

const goToLogin = () => {
  router.push({ name: "login" });
};

const register = async () => {
  try {
    const postData = {
      username: username.value,
      password: password.value,
      name: name.value,
    };
    await apiService.post("/auth/signup", postData);
    username.value = "";
    password.value = "";
    name.value = "";
    toast.success("Account created succesfully", {
      timeout: 2000,
    });
    goToLogin();
  } catch (err) {
    toast.error("Something went wrong", {
      timeout: 2000,
    });
    console.error(err);
  }
};
</script>

<style scoped>
.login {
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
  width: 30%;
  background-color: black;
}

.v-card {
  width: 30%;
}

.heading {
  font-weight: 500;
  font-size: 18px;
  color: white;
  margin-left: 6px;
}

.text-fields {
  padding: 20px;
}

.login-btn {
  width: 100%;
}
</style>
