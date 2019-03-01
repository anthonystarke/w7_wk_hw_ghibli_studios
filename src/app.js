const MoviesData = require('./models/movies_data.js');
const MoviesParentView = require('./views/movies_parent_view.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  moviesParentView = new MoviesParentView();
  moviesParentView.bindEvents();

  moviesData = new MoviesData('https://ghibliapi.herokuapp.com/films');
  moviesData.getData();
  moviesData.bindEvents();

});
