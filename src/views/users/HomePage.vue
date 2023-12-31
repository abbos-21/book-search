<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router/router'

const books = ref([])
const query = ref('')
let loading = ref(false)

const fetchApi = async () => {
  loading.value = true
  try {
    const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query.value,
        key: "AIzaSyB9fMRB6Nu6_PRtka42FUTKNZKFa8_0Ipw"
      }
    })
    books.value = res.data.items
  } catch (error) {
    console.log('Error fetching data', error)
  } finally {
    loading.value = false
  }
}

const openBookDetailsInNewTab = (id) => {
  const route = {
    name: 'Book Details',
    params: { id: id }
  }
  const url = router.resolve(route).href
  window.open(url, '_blank')
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <a href="#" class="navbar-brand">Book search</a>
      <button class="btn btn-danger ms-3" type="button" @click="logout">Log out</button>
    </div>
  </nav>

  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-10">
        <form class="d-flex" @submit.prevent="fetchApi">
          <input
            v-model="query"
            type="search"
            class="form-control me-2"
            placeholder="Enter a search term"
          />

          <button
            v-if="loading"
            class="btn btn-success d-flex align-items-center"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            Searching...
          </button>
          <button v-else type="submit" class="btn btn-success">Search</button>
        </form>
      </div>
    </div>

    <div class="row mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Thumbnail</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.key" @click="openBookDetailsInNewTab(book.id)">
            <th>
              <img
                v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail"
                :src="book.volumeInfo.imageLinks.smallThumbnail"
                alt=""
              />
            </th>
            <td v-if="book.volumeInfo.title">{{ book.volumeInfo.title }}</td>
            <td v-else>No data</td>
            <td v-if="book.volumeInfo.authors">{{ book.volumeInfo.authors.join(', ') }}</td>
            <td v-else>No data</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
tbody tr {
  cursor: pointer;
}
</style>
