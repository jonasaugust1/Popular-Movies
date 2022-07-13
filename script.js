const apiKey = config.MY_API_TOKEN
const baseURL = 'https://api.themoviedb.org/3/'
const requestParams = `?api_key=${apiKey}&language=pt-BR`

const dropDownMenu = document.getElementById('genres')
const main = document.getElementById('principal')

async function getGenres() {
  const genresEndpoint = 'genre/movie/list'
  const urlToFetch = baseURL + genresEndpoint + requestParams

  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      const genres = jsonResponse.genres
      return genres
    }
  }catch(error){
    console.log(error)
  }
}

const populateDropDownMenu = async () => {
  const genreOptions = await getGenres()
  for(let i = 0; i < genreOptions.length; i++){
    dropDownMenu.innerHTML += `<option value="${genreOptions[i].name}">${genreOptions[i].name}</option>`
  }
}

populateDropDownMenu()

const getTrendingMovies = async () => {
  const trendingMoviesEndpoint = 'trending/movie/week'
  const urlToFetch = baseURL + trendingMoviesEndpoint + requestParams

  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      const trendingMovies = jsonResponse.results
      return trendingMovies
    }
  }catch(error) {
    console.log(error)
  }
}

console.log(getTrendingMovies())

const displayMovies = async () => {
  const imageURL = 'https://image.tmdb.org/t/p/original'
  const movies = await getTrendingMovies()
  for(let i = 0; i < movies.length; i++){
    main.innerHTML += `<section class="card">
                          <img src="${imageURL}${movies[i].backdrop_path}" alt="">

                          <div class="movie-name">
                              <h4>${movies[i].title} (${movies[i].release_date.slice(0, 4)})</h4>
                              <img src="./imgs/Star.svg" alt="Estrela">
                              <span>${(movies[i].vote_average).toFixed(1)}</span>
                              <img src="./imgs/heart.svg" alt="Coração">
                              <span>Favoritar</span>
                          </div>

                          <div class="sinopse">
                              <p>${movies[i].overview}</p>
                          </div>
    
                        </section>`
  }
}

displayMovies()
