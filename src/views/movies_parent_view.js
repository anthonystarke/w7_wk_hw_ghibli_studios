const PubSub = require('../helpers/pub_sub.js');
const MovieView = require('./movie_view.js');
const MoviesDropDownView = require('./movies_dropdown_view.js');

const MoviesParentView = function() {
};

MoviesParentView.prototype.bindEvents = function () {
  const dateDropDownList = document.querySelector('#dateDropDown');
  const rateDropDownList = document.querySelector('#rateDropDown');
  const mainBodyClick = document.querySelector('#main-body');
  console.log(mainBodyClick);
  // mainBodyClick.addEventListener('click',(evt)=> {
  // console.log(evt.target.div);
// })

  PubSub.subscribe('MoviesData:sending-Data',(evt) => {
    this.moviesData = evt.detail;
    this.renderParentView();
    this.buildDateDropDown();
    this.buildRateDropDown();

  });

  PubSub.subscribe('MoviesData:selectedObject-sent', (evt) =>{
    const parent = document.querySelector('#main-body');
    parent.innerHTML = '';

    const movieView = new MovieView(parent);
    const moviesOfYear = evt.detail;
    movieView.render(moviesOfYear);
  })

  rateDropDownList.addEventListener('change',(evt) => {
    dateDropDownList.selectedIndex = 0;

    const rate = evt.target.value;
    if(rate === 'all'){
      this.renderParentView();
    } else {
      PubSub.publish('MoviesParentView:publishRate_selected',rate);
    }
  });

  dateDropDownList.addEventListener('change',(evt) => {
    rateDropDownList.selectedIndex = 0;
    const year = evt.target.value;
    if(year === 'all'){
      this.renderParentView();
    } else {
      PubSub.publish('MoviesParentView:publishYear_selected',year);
    }
  });
};

MoviesParentView.prototype.buildDateDropDown = function() {
  PubSub.subscribe('MoviesData:sending-release_date', function(evt) {

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
  PubSub.subscribe('MoviesData:sending-rt_score',(evt) => {

    const dropDownList = document.querySelector('#rateDropDown');

    const dropDownAll = document.createElement('option');
    dropDownAll.textContent = 'All';
    dropDownAll.value = 'all';
    dropDownList.appendChild(dropDownAll);

    const dropDownDates = evt.detail;

    dropDownDates.forEach(function(dropDownItem,index){
      moviesDropDownView = new MoviesDropDownView();
      moviesDropDownView.buildDropDown(dropDownItem,dropDownItem,dropDownList);
    })
  })
};

MoviesParentView.prototype.renderParentView = function () {

  const primaryParent = document.querySelector('#main-body');
  primaryParent.textContent = '';

  this.moviesData.forEach(function(movieItem){
    const movieView = new MovieView(primaryParent);
    movieView.render(movieItem);
  });
};

module.exports = MoviesParentView;
