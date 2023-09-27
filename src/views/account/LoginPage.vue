<script setup>
import { ref } from 'vue'
import router from '@/router/router'
import userDetails from '@/helpers/fake-backend'

let username = ref('')
let password = ref('')
let loading = ref(false)
let loginError = ref(false)

let isAuth = false

const login = () => {
  loading.value = true
  userDetails.forEach((e) => {
    if (e.username === username.value && e.password === password.value) {
      isAuth = true
    }
  })

  setTimeout(() => {
    if (isAuth) {
      localStorage.setItem('token', username.value)
      router.push('/home')
    } else {
      loading.value = false
      password.value = ''
      loginError.value = true
    }
  }, 3000)
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
                v-model="username"
                type="text"
                class="form-control"
                id="inputUsername"
                pattern="^[A-Za-z]+$"
                title="Please use only letters!"
                required
                minlength="16"
                aria-describedby="inputHelp"
              />
              <div v-if="loginError" id="inputHelp" class="form-text text-danger">Invalid credentials</div>
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
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
