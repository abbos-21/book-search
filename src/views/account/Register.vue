<script setup></script>

<template>
  <div class="container d-flex flex-column justify-content-center">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-10 col-sm-10 col-12">
        <div class="card">
          <div class="card-header">Join us today!</div>
          <form class="card-body">
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username: </label>
              <input
                type="text"
                class="form-control"
                id="inputUsername"
                pattern="/^[a-zA-Z]+$/"
                required
                title="Please use only letters!"
              />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password: </label>
              <input type="password" class="form-control" id="inputPassword" required />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button type="submit" class="btn btn-primary">Sign up</button>
              <span class="login-message"
                >Already have an account? <router-link to="/login">Log in</router-link></span
              >
            </div>
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

.login-message {
  font-size: smaller;
}
</style>
