<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')

const emit = defineEmits<{
  submit: [username: string, password: string]
}>()

function handleSubmit() {
  if (!username.value) {
    error.value = 'Username is required'
  } else if (!password.value) {
    error.value = 'Password is required'
  } else {
    error.value = ''
    emit('submit', username.value, password.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Login</h1>
    <div>
      <label for="username">Username:</label>
      <input id="username" v-model="username" type="text" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" />
    </div>
    <button type="submit">Submit</button>
    <div v-if="error" role="alert">{{ error }}</div>
  </form>
</template>
