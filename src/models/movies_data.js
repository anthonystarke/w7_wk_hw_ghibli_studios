const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const MoviesData = function(url){
  this.url = url;
  this.moviesData = 0;
};

MoviesData.prototype.getData = function () {
  requestHelper = new RequestHelper(this.url);
  requestHelper.get()
    .then((movieData) => {
      this.moviesData = movieData;
      this.publishData();
    });
};

MoviesData.prototype.publishData = function () {
  this.bindEvents();
  this.publishAllData();
  this.publishList('release_date');
  this.publishList('rt_score');
};

MoviesData.prototype.bindEvents = function () {
  PubSub.subscribe('MoviesParentView:publishYear_selected', (evt) => {
    const movieObject = this.getSelectedObject("release_date",evt.detail);
    PubSub.publish('MoviesData:selectedObject-sent',movieObject);
  })
  PubSub.subscribe('MoviesParentView:publishRate_selected', (evt) => {
    const movieObject = this.getSelectedObject("rt_score",evt.detail);
    PubSub.publish('MoviesData:selectedObject-sent',movieObject);
  })
};

MoviesData.prototype.publishAllData = function () {
  PubSub.publish('MoviesData:sending-Data',this.moviesData);
};

MoviesData.prototype.publishList = function (listOf) {
  const yearList = this.getList(listOf);
  PubSub.publish(`MoviesData:sending-${listOf}`,yearList.sort());
};

MoviesData.prototype.getList = function (listItem) {
  const array = this.moviesData.map(function(movieItem){
    return movieItem[listItem];
  });
  return this.unique(array)
};

MoviesData.prototype.getSelectedObject = function(key,check) {
  return this.moviesData.filter( movie => movie[key] === check);
};

MoviesData.prototype.unique = function (array) {
  const newArray = array.reduce(function(total,item){
    if(!total.includes(item)){
      total.push(item);
    }
    return total;
  },[]);
  return newArray;
};

module.exports = MoviesData;
