const MovieView = function(primaryParent){
  this.primaryParent = primaryParent;

}

MovieView.prototype.buildElement = function (element,content,parent) {
  const newItem = document.createElement(element);
  newItem.textContent = content;
  parent.appendChild(newItem);
  return newItem;
};

MovieView.prototype.buildItem = function (movieObject,className) {

  const container = document.createElement('div');
  container.classList.add(className);
  container.setAttribute('id',"test");
  this.primaryParent.appendChild(container);

  const itemHeader = this.buildElement('h2',movieObject.title,container);
  itemHeader.classList.add('itemHeader');

  const itemScore = this.buildElement('p',`Score: ${movieObject.rt_score}`,container);
  itemScore.classList.add('itemScore');

  const itemReleaseDate = this.buildElement('p',`Release Year: ${movieObject.release_date}`,container);
  itemReleaseDate.classList.add('itemReleaseDate');

  const itemDescription = this.buildElement('p',movieObject.description,container);
  itemDescription.classList.add('itemDescription');

};

MovieView.prototype.render = function (moviesData) {
  
  if(!Array.isArray(moviesData)){
    this.buildItem(moviesData,'movieItems');
  } else {

    moviesData.forEach((movie) => {
      this.buildItem(movie,'movieItem');
    })
  };
  const mainBodyClick = document.querySelectorAll('.movieItems');

  console.log(mainBodyClick);
};

module.exports = MovieView;
