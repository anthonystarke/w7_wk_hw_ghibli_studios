const PubSub = require('../helpers/pub_sub.js');
const MovieView = require('./movie_view.js');
const MoviesDropDownView = require('./movies_dropdown_view.js');

const MoviesParentView = function() {
  this.moviesData = 0
};

MoviesParentView.prototype.bindEvents = function () {
  PubSub.subscribe('MoviesData:sending-Data',(evt) => {
    this.moviesData = evt.detail;
    this.renderParentView();
    this.buildDateDropDown();
    this.buildRateDropDown();

  });
  const dropDownList = document.querySelector('#dateDropDown');

  PubSub.subscribe('MoviesData:selectedObject-sent', (evt) =>{
    const parent = document.querySelector('#ghibliMainBody');
    parent.innerHTML = '';

    const movieView = new MovieView(parent);
    movieView.renderSelected(evt.detail);
  })

  dropDownList.addEventListener('change',(evt) => {
    const indexNumber = evt.target.value;
    if(indexNumber === 'all'){
      this.renderParentView();
    } else {
      PubSub.publish('MoviesParentView:publish_selected',indexNumber);
    }
  })
};
MoviesParentView.prototype.buildDateDropDown = function() {
  const dropDownList = document.querySelector('#dateDropDown');

  const dropDownAll = document.createElement('option');
  dropDownAll.textContent = 'All';
  dropDownAll.value = 'all';
  dropDownList.appendChild(dropDownAll);

  const dropDownDates = this.getDateData();

  dropDownDates.forEach(function(dropDownItem,index){
    moviesDropDownView = new MoviesDropDownView();
    moviesDropDownView.buildDropDown(dropDownItem,index,dropDownList);
  })
};

MoviesParentView.prototype.buildRateDropDown = function() {
  const dropDownList = document.querySelector('#rateDropDown');

  const dropDownAll = document.createElement('option');
  dropDownAll.textContent = 'All';
  dropDownAll.value = 'all';
  dropDownList.appendChild(dropDownAll);

  const dropDownDates = this.getRateData();

  dropDownDates.forEach(function(dropDownItem,index){
    moviesDropDownView = new MoviesDropDownView();
    moviesDropDownView.buildDropDown(dropDownItem,index,dropDownList);
  })
};

MoviesParentView.prototype.getRateData = function () {
  return this.moviesData.map(function(movieItem){
    return movieItem.rt_score;
  });
};

MoviesParentView.prototype.unique = function (array) {
  const newArray = [];

  array.forEach(function(item){
    if(!newArray.includes(item)){
      newArray.push(item);
    }
  });
  console.log(newArray);
  return newArray;
};

MoviesParentView.prototype.getDateData = function () {
  const array = this.moviesData.map(function(movieItem){
    return movieItem.release_date;
  });
  return this.unique(array)
};

MoviesParentView.prototype.renderParentView = function () {

  const primaryParent = document.querySelector('#ghibliMainBody');

  this.moviesData.forEach(function(movieItem){
    const movieView = new MovieView(primaryParent);
    movieView.renderView(movieItem.title,movieItem.description);
  });
};

module.exports = MoviesParentView;
