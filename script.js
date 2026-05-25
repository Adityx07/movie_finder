// ======================================
// script.js
// ======================================

import { movies } from './movies_data.js';

$(document).ready(() => {

  // Display all movies initially
  displayMovies(movies);

  // Search form submit
  $('#searchForm').on('submit', (e) => {

    e.preventDefault();

    const searchText = $('#searchText')
      .val()
      .toLowerCase()
      .trim();

    // If empty show all movies
    if (searchText === '') {
      displayMovies(movies);
      return;
    }

    // Filter movies
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText)
    );

    displayMovies(filteredMovies);

  });

});


// ======================================
// DISPLAY MOVIES
// ======================================

function displayMovies(movieList) {

  let output = '';

  // No movies found
  if (movieList.length === 0) {

    output = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          No movies found
        </div>
      </div>
    `;

    $('#movies').html(output);

    return;
  }

  movieList.forEach((movie) => {

    output += `

      <div class="col-md-3 mb-4">

        <div class="card h-100 bg-dark text-light">

          <img
            src="${movie.poster}"
            class="card-img-top"
            alt="${movie.title}"
          >

          <div class="card-body d-flex flex-column">

            <h5 class="card-title">
              ${movie.title}
            </h5>

            <p>
              <strong>Year:</strong> ${movie.year}
            </p>

            <p>
              <strong>Genre:</strong> ${movie.genre}
            </p>

            <p>
              <strong>IMDb:</strong> ⭐ ${movie.rating}
            </p>

            <button
              onclick="movieSelected(${movie.id})"
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
}


// ======================================
// SELECT MOVIE
// ======================================

window.movieSelected = function(id) {

  sessionStorage.setItem('movieId', id);

  window.location = 'movie.html';
};


// ======================================
// GET SINGLE MOVIE
// ======================================

window.getMovie = function() {

  const movieId = sessionStorage.getItem('movieId');

  // Find selected movie
  const movie = movies.find(
    (m) => m.id == movieId
  );

  // Movie not found
  if (!movie) {

    $('#movie').html(`
      <div class="alert alert-danger">
        Movie not found
      </div>
    `);

    return;
  }

  let output = `

    <div class="row g-4">

      <div class="col-md-4">

        <img
          src="${movie.poster}"
          class="img-fluid rounded"
          alt="${movie.title}"
        >

      </div>

      <div class="col-md-8">

        <h2>${movie.title}</h2>

        <ul class="list-group mb-3">

          <li class="list-group-item">
            <strong>Genre:</strong> ${movie.genre}
          </li>

          <li class="list-group-item">
            <strong>Year:</strong> ${movie.year}
          </li>

          <li class="list-group-item">
            <strong>IMDb Rating:</strong> ⭐ ${movie.rating}
          </li>

          <li class="list-group-item">
            <strong>Director:</strong> ${movie.director}
          </li>

          <li class="list-group-item">
            <strong>Actors:</strong> ${movie.actors}
          </li>

        </ul>

        <h4>Plot</h4>

        <p>${movie.plot}</p>

        <a
          href="index.html"
          class="btn btn-secondary mt-3"
        >
          Go Back
        </a>

      </div>

    </div>
  `;

  $('#movie').html(output);
};