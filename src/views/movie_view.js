const MovieView = function(primaryParent){
  this.primaryParent = primaryParent;

}

MovieView.prototype.renderView = function (title,description) {

  const movieTitle = document.createElement('h2');
  movieTitle.textContent = title;
  this.primaryParent.appendChild(movieTitle);

  const movieDescription = document.createElement('p');
  movieDescription.textContent = description;
  this.primaryParent.appendChild(movieDescription);

};

MovieView.prototype.buildElement = function (element,content,parent) {
  const newItem = document.createElement(element);
  newItem.textContent = content;
  parent.appendChild(newItem);
};

MovieView.prototype.renderSelected = function (movieData) {

  const container = document.createElement('div');
  container.classList.add('movieItem');
  this.primaryParent.appendChild(container);

  this.buildElement('h2',movieData.title,container);
  this.buildElement('p',movieData.description,container);

};

module.exports = MovieView;
