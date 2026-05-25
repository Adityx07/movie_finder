$(document).ready(() => {

  // Search form submit
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();

    const searchText = $('#searchText').val().trim();

    if (searchText === '') {
      alert('Please enter a movie name');
      return;
    }

    getMovies(searchText);
  });

});


// =========================
// OMDb API KEY
// =========================

// Replace this with your real API key
const API_KEY = 'YOUR_API_KEY';


// =========================
// GET MOVIES
// =========================

function getMovies(searchText) {

  axios
    .get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`)

    .then((response) => {

      // No movies found
      if (response.data.Response === 'False') {

        $('#movies').html(`
          <div class="col-12">
            <div class="alert alert-danger text-center">
              No movies found
            </div>
          </div>
        `);

        return;
      }

      let movies = response.data.Search;
      let output = '';

      $.each(movies, (index, movie) => {

        // Handle missing posters
        let poster = movie.Poster !== 'N/A'
          ? movie.Poster
          : 'https://via.placeholder.com/300x450?text=No+Image';

        output += `
          <div class="col-md-3 mb-4">

            <div class="card h-100 bg-dark text-light">

              <img
                src="${poster}"
                class="card-img-top"
                alt="${movie.Title}"
              >

              <div class="card-body d-flex flex-column">

                <h5 class="card-title">
                  ${movie.Title}
                </h5>

                <button
                  onclick="movieSelected('${movie.imdbID}')"
                  class="btn btn-primary mt-auto"
                >
                  Movie Details
                </button>

              </div>

            </div>

          </div>
        `;
      });

      $('#movies').html(output);
    })

    .catch((err) => {

      console.log(err);

      $('#movies').html(`
        <div class="col-12">
          <div class="alert alert-danger text-center">
            Something went wrong
          </div>
        </div>
      `);

    });
}


// =========================
// SELECT MOVIE
// =========================

function movieSelected(id) {

  sessionStorage.setItem('movieId', id);

  window.location = 'movie.html';
}


// =========================
// GET SINGLE MOVIE
// =========================

function getMovie() {

  const movieId = sessionStorage.getItem('movieId');

  // If no movie selected
  if (!movieId) {

    $('#movie').html(`
      <div class="alert alert-warning">
        No movie selected
      </div>
    `);

    return;
  }

  axios
    .get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`)

    .then((response) => {

      let movie = response.data;

      let poster = movie.Poster !== 'N/A'
        ? movie.Poster
        : 'https://via.placeholder.com/300x450?text=No+Image';

      let output = `
        
        <div class="row g-4">

          <div class="col-md-4">

            <img
              src="${poster}"
              class="img-fluid rounded"
              alt="${movie.Title}"
            >

          </div>

          <div class="col-md-8">

            <h2>${movie.Title}</h2>

            <ul class="list-group mb-3">

              <li class="list-group-item">
                <strong>Genre:</strong> ${movie.Genre}
              </li>

              <li class="list-group-item">
                <strong>Released:</strong> ${movie.Released}
              </li>

              <li class="list-group-item">
                <strong>Rated:</strong> ${movie.Rated}
              </li>

              <li class="list-group-item">
                <strong>IMDb Rating:</strong> ${movie.imdbRating}
              </li>

              <li class="list-group-item">
                <strong>Director:</strong> ${movie.Director}
              </li>

              <li class="list-group-item">
                <strong>Writer:</strong> ${movie.Writer}
              </li>

              <li class="list-group-item">
                <strong>Actors:</strong> ${movie.Actors}
              </li>

            </ul>

          </div>

        </div>

        <div class="mt-4">

          <h3>Plot</h3>

          <p>${movie.Plot}</p>

          <hr>

          <a
            href="https://www.imdb.com/title/${movie.imdbID}"
            target="_blank"
            class="btn btn-primary me-2"
          >
            View IMDb
          </a>

          <a
            href="index.html"
            class="btn btn-secondary"
          >
            Go Back
          </a>

        </div>
      `;

      $('#movie').html(output);

    })

    .catch((err) => {

      console.log(err);

      $('#movie').html(`
        <div class="alert alert-danger">
          Failed to load movie details
        </div>
      `);

    });
}