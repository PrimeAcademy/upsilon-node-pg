$(document).ready(function () {
  getMovies();

  // add a movie
  $('#movieSubmit').on('click', postMovie);
});

function getMovies() {
  $.ajax({
    type: 'GET',
    url: '/movies',
    success: function (movies) {
      console.log(movies);
      movies.forEach(function (movie) {
        $('#movieList').append('<div>' + movie.title +
          '|' + movie.year +
          '|' + movie.genre +
          '|' + movie.director +
        '</div>');
      });
    },
  });


}

function postMovie() {
  event.preventDefault();

  var movie = {};

  $.each($('#movieForm').serializeArray(), function (i, field) {
    movie[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/movies',
    data: movie,
    success: function (data) {
      console.log('Successful post!');
    },
  });
}
