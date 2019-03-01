const MovieView = function(primaryParent){
  this.primaryParent = primaryParent;

}

MovieView.prototype.buildElement = function (element,content,parent) {
  const newItem = document.createElement(element);
  newItem.textContent = content;
  parent.appendChild(newItem);
};

MovieView.prototype.buildItem = function () {

};

MovieView.prototype.render = function (moviesData) {

  const container = document.createElement('div');
  container.classList.add('movieItem');
  this.primaryParent.appendChild(container);

  if(!Array.isArray(moviesData)){

    this.buildElement('h2',moviesData.title,container);
    this.buildElement('p',`Score: ${moviesData.rt_score}`,container);
    this.buildElement('p',moviesData.description,container);

  } else {

    moviesData.forEach((movie) => {

      this.buildElement('h2',movie.title,container);
      this.buildElement('p',`Score: ${movie.rt_score}`,container);
      this.buildElement('p',movie.description,container);

    })
  };
};

module.exports = MovieView;
