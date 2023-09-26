<script setup>
import { ref } from 'vue'
import axios from 'axios'

const books = ref([])
const query = ref('')
let loading = ref(false)

const fetchApi = async () => {
  loading.value = true
  try {
    const res = await axios.get('https://openlibrary.org/search.json', {
      params: {
        q: query.value,
        limit: 20
      }
    })
    books.value = res.data.docs
    console.log(books.value)
  } catch (error) {
    console.log('Error fetching data', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <a href="#" class="navbar-brand">Book search</a>

      <div class="d-flex align-items-center">
        <span>Username</span>
        <button class="btn btn-danger ms-3" type="button">Log out</button>
      </div>
    </div>
  </nav>

  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-10">
        <form class="d-flex" @submit.prevent="fetchApi">
          <input v-model="query" type="search" class="form-control me-2" />
          <button v-if="!loading" type="submit" class="btn btn-success">Search</button>
          <button v-else class="btn btn-success d-flex align-items-center" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </form>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-lg-4 col-6 col-sm-6 col-12 d-flex mb-4" v-for="book in books" :key="book.key">
        <img
          v-if="book.cover_i"
          :src="'https://covers.openlibrary.org/b/id/' + book.cover_i + '-L.jpg'"
          class="thumbnail img-thumbnail"
          alt="Book cover image"
        />
        <img
          v-else
          class="thumbnail"
          src="https://openlibrary.org/images/icons/avatar_book.png"
          alt="Book cover image"
        />
        <div class="ms-3 mt-3">
          <router-link
            :to="'/book/' + book.key.replace('/works/', '')"
            class="font-weight-bold text-decoration-none text-black book-title"
          >
            <p>{{ book.title }}</p>
          </router-link>
          <p class="font-weight-medium book-subtitle" v-if="book.author_name.length <= 100">
            by {{ book.author_name.join(', ') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-title {
  font-size: 18px;
}

.thumbnail {
  width: 200px;
  height: 300px;
}

@media only screen and (max-width: 1200px) {
  .thumbnail {
    width: 100px;
    height: 150px;
  }

  .book-title {
    font-size: 14px;
  }

  .book-subtitle {
    font-size: 12px;
  }
}
</style>
