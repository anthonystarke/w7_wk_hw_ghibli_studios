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
  PubSub.publish('MoviesData:sending-Data',this.moviesData);
};

MoviesData.prototype.bindEvents = function () {
  PubSub.subscribe('MoviesParentView:publish_selected', (evt) => {
    const movieObject = this.getSelectedObject(evt.detail);
    PubSub.publish('MoviesData:selectedObject-sent',movieObject);
  })
};

MoviesData.prototype.getSelectedObject = function(itemIndex) {
  return this.moviesData[itemIndex];
};

module.exports = MoviesData;
