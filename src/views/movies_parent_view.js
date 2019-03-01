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
  const dateDropDownList = document.querySelector('#dateDropDown');

  PubSub.subscribe('MoviesData:selectedObject-sent', (evt) =>{
    const parent = document.querySelector('#ghibliMainBody');
    parent.innerHTML = '';

    const movieView = new MovieView(parent);
    movieView.renderSelected(evt.detail);
  })

  dateDropDownList.addEventListener('change',(evt) => {
    const year = evt.target.value;
    if(year === 'all'){
      this.renderParentView();
    } else {
      PubSub.publish('MoviesParentView:publish_selected',year);
    }
  })
};

MoviesParentView.prototype.buildDateDropDown = function() {
  PubSub.subscribe('MoviesData:sending-yearData', function(evt) {

    const dropDownList = document.querySelector('#dateDropDown');

    const dropDownAll = document.createElement('option');
    dropDownAll.textContent = 'All';
    dropDownAll.value = 'all';
    dropDownList.appendChild(dropDownAll);

    const dropDownDates = evt.detail;

    dropDownDates.forEach(function(dropDownItem,index){
      moviesDropDownView = new MoviesDropDownView();
      moviesDropDownView.buildDropDown(dropDownItem,dropDownItem,dropDownList);
    });
  });
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

MoviesParentView.prototype.renderParentView = function () {

  const primaryParent = document.querySelector('#ghibliMainBody');

  this.moviesData.forEach(function(movieItem){
    const movieView = new MovieView(primaryParent);
    movieView.renderView(movieItem.title,movieItem.description);
  });
};

module.exports = MoviesParentView;
