import { defineStore } from "pinia"
import { useMovieStore } from "./MovieStore"
// const url = 'https://api.themoviedb.org/3/search/movie/11?api_key=a1149a39e1c8d1209955cce47bc56e01='
const urlSearch = 'https://api.themoviedb.org/3/search/movie?query='
const key = '&api_key=a1149a39e1c8d1209955cce47bc56e01'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    loader: false,
    movies: []
  }),
  actions: {
    async getMovies(search) {
      this.loader = true
      const res = await fetch(`${urlSearch}${search}${key}`)
      const data = await res.json()
      this.movies = data.results
      this.loader = false
    },
    addToUserMovies(object) {
      const movieStore = useMovieStore()
      movieStore.movies.push({...object, isWatched: false})
      movieStore.activeTab = 1
    }
  }
})