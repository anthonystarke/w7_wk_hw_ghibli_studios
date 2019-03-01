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
  this.publishYearData();
};

MoviesData.prototype.publishAllData = function () {
  PubSub.publish('MoviesData:sending-Data',this.moviesData);
};

MoviesData.prototype.bindEvents = function () {
  PubSub.subscribe('MoviesParentView:publish_selected', (evt) => {
    const movieObject = this.getSelectedObject(evt.detail);
    PubSub.publish('MoviesData:selectedObject-sent',movieObject);
  })
};

MoviesData.prototype.publishYearData = function () {
  const yearData = this.getYearData();
  PubSub.publish('MoviesData:sending-yearData',yearData);
};

MoviesData.prototype.getYearData = function () {
  const array = this.moviesData.map(function(movieItem){
    return movieItem.release_date;
  });
  return this.unique(array)

};

MoviesData.prototype.getSelectedObject = function(itemIndex) {
  return this.moviesData.[itemIndex];
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
