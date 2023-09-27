<script setup>
import { ref } from 'vue'
import router from '@/router/router'

let username = ref('')
let password = ref('')
let loading = ref(false)
let inputError = ref(false)

const login = () => {
  loading.value = true

  setTimeout(() => {
    localStorage.setItem('token', username.value)
    router.push('/home')
  }, 3000)
}

function checkInput() {
  inputError.value = username.value.length !== 16;
}
</script>

<template>
  <div class="container d-flex flex-column justify-content-center">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-10 col-sm-10 col-12">
        <div class="card">
          <div class="card-header">Welcome back!</div>
          <form class="card-body" @submit.prevent="login">
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username: </label>
              <input
                @input="checkInput"
                v-model="username"
                type="text"
                class="form-control"
                id="inputUsername"
                pattern="^[A-Za-z]+$"
                title="Please use only letters!"
                required
                aria-describedby="inputHelp"
                minlength="16"
                maxlength="16"
              />
              <div v-if="inputError" class="form-text text-danger">
                The username must be 16 characters
              </div>
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password: </label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                id="inputPassword"
                required
              />
            </div>

            <button v-if="loading" class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Logging in...
            </button>

            <button v-else type="submit" class="btn btn-primary">Log in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
}

.card-header {
  font-size: 24px;
}
</style>
