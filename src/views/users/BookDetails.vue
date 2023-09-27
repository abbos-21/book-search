<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const book = ref([])
let loading = ref(false)

const fetchApi = async () => {
  loading.value = true
  try {
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${route.params.id}`)
    book.value = res.data
    console.log(book.value)
  } catch (error) {
    console.log('Error fetching data', error)
  } finally {
    loading.value = false
  }
}

fetchApi()
</script>

<template>
  <div class="container mt-4">
    <div v-if="loading" class="row justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="row" v-if="!loading">
      <div class="col-12 d-flex flex-md-row flex-column align-items-md-stretch align-items-center">
        <img
          v-if="book.volumeInfo.imageLinks.large"
          :src="book.volumeInfo.imageLinks.large"
          alt="Book cover image"
          class="img-thumbnail"
        />

        <div class="ms-md-4 ms-0 mt-md-0 mt-4">
          <p v-if="book.volumeInfo.title" class="font-weight-bold book-title">
            {{ book.volumeInfo.title }}
          </p>
          <p v-if="book.volumeInfo.authors" class="font-weight-medium">
            by {{ book.volumeInfo.authors.join(', ') }}
          </p>
          <p v-if="book.volumeInfo.description" v-html="book.volumeInfo.description"></p>
          <p v-else class="">No description</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-title {
  font-size: 20px;
}

img {
  width: 400px;
  height: 600px;
}
</style>
