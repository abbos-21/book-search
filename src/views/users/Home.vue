<script setup>
import { ref } from 'vue'
import axios from 'axios'

const query = ref('')
const books = ref([])

const searchBooks = async () => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query.value
      }
    })

    books.value = response.data.items || []
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>

<template>
  <nav class="navbar navbar-light bg-light py-3">
    <div class="container">
      <a class="navbar-brand" href="#">Book search</a>
      <button class="btn btn-danger ms-3">Log out</button>
    </div>
  </nav>

  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-12">
        <form class="d-flex" role="search" @submit.prevent="searchBooks">
          <input
              @input.prevent="searchBooks"
            v-model="query"
            class="form-control me-2"
            type="search"
            placeholder="Search for books by title, author, or keywords"
            aria-label="Search"
          />
          <button class="btn btn-primary" type="submit">Search</button>
        </form>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-4 mb-3 d-flex justify-content-between" v-for="book in books" :key="book.id">
        <div class="card w-100">
          <div class="card-body d-flex">
            <img :src="book.volumeInfo.imageLinks.thumbnail" class="h-75" alt="book-cover" />
            <div class="ms-3">
              <p>Title: <b>{{book.volumeInfo.title}}</b></p>
              <p>Authors: <b>{{book.volumeInfo.authors[0]}}</b></p>
              <router-link to="/login" class="btn btn-primary btn-sm">See more</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
