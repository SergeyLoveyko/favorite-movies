import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'


//  options api
// export const useMovieStore = defineStore('movieStore', {
//   state: () => ({
//     movies: [],
//     activeTab: 2
//   }),
//   getters: {
//     watchedMovies() {
//       return this.movies.filter(el => el.isWatched )
//     },
//     totalCountMovies() {
//       return this.movies.length
//     }
//   },
//   actions: {
//     setActiveTab(id) {
//       this.activeTab = id
//     },
//     toggleWatched(id) {
//       const idx = this.movies.findIndex(el => el.id === id)
//       this.movies[idx].isWatched = !this.movies[idx].isWatched
//     },
//     deleteMovie(id) {
//       this.movies = this.movies.filter(el => el.id !== id)
//     }
//   }
// })


//  composition api
export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref([])
  const activeTab = ref(2)

  const moviesInLocalStorage = localStorage.getItem('movies')
  if (moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage)._value
    console.log( JSON.parse(moviesInLocalStorage) );
  }

  const watchedMovies = computed(() => {
    return movies.value.filter(el => el.isWatched )
  })

  const totalCountMovies = computed(() => {
    return movies.value.length
  })

  const setActiveTab = (id) => {
    activeTab.value = id
  }

  const toggleWatched = (id) => {
    const idx = movies.value.findIndex(el => el.id === id)
    movies.value[idx].isWatched = !movies.value[idx].isWatched
  }

  const deleteMovie = (id) => {
    movies.value = movies.value.filter(el => el.id !== id)
  }

  watch(() => movies, (state) => {
    localStorage.setItem('movies', JSON.stringify(state))
  }, {deep: true})

  return {
    movies,
    activeTab,
    watchedMovies,
    totalCountMovies,
    setActiveTab,
    toggleWatched,
    deleteMovie
  }
})