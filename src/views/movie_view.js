const MovieView = function(primaryParent){
  this.primaryParent = primaryParent;

}

MovieView.prototype.buildElement = function (element,content,parent) {
  const newItem = document.createElement(element);
  newItem.textContent = content;
  parent.appendChild(newItem);
};

MovieView.prototype.buildItem = function (movieObject) {

  const container = document.createElement('div');
  container.classList.add('movieItem');
  this.primaryParent.appendChild(container);

  this.buildElement('h2',movieObject.title,container);
  this.buildElement('p',`Score: ${movieObject.rt_score}`,container);
  this.buildElement('p',movieObject.description,container);
};

MovieView.prototype.render = function (moviesData) {

  if(!Array.isArray(moviesData)){
    this.buildItem(moviesData);
  } else {

    moviesData.forEach((movie) => {
      this.buildItem(movie);
    })
  };
};

module.exports = MovieView;
