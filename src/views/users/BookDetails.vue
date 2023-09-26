<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const book = ref([])
const author = ref([])
let loading = ref(false)

const fetchApi = async () => {
  loading.value = true
  try {
    const res = await axios.get(`https://openlibrary.org/works/${route.params.id}.json`)
    book.value = res.data
    fetchAuthor()
    console.log(book.value)
  } catch (error) {
    console.log('Error fetching data', error)
  } finally {
    loading.value = false
  }
}

const fetchAuthor = async () => {
  try {
    const res = await axios.get(`https://openlibrary.org${book.value.authors[0].author.key}.json`)
    author.value = res.data
    console.log(author.value)
  } catch (error) {
    console.log('Error fetching author', error)
  }
}

fetchApi()
</script>

<template>
  <div class="container d-flex flex-column justify-content-center" style="height: 100vh">
    <div v-if="loading" class="row justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="row justify-content-center" v-if="!loading">
      <div class="col-8 d-flex align-items-center">
        <img
          v-if="book.covers"
          :src="'https://covers.openlibrary.org/b/id/' + book.covers[0] + '-L.jpg'"
          alt="Book cover image"
          class="img-thumbnail"
        />
        <img
          v-else
          src="https://openlibrary.org/images/icons/avatar_book.png"
          alt="Book cover image"
          class="img-thumbnail"
        />

        <div class="ms-4">
          <p v-if="book.title" class="font-weight-bold book-title">{{ book.title }}</p>
          <p v-if="book.authors" class="font-weight-medium">by {{ author.name }}</p>
          <p v-if="book.description" class="">{{ book.description || book.description.value }}</p>
          <p v-else class="">No description</p>
          <router-link to="/home">Back to search</router-link>
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
