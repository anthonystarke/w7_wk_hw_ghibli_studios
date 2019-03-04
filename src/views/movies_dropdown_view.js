
const MoviesDropDownView = function(){

}

MoviesDropDownView.prototype.buildDropDown = function (dropDownData,index,dropDownList) {

  const dropDownItem = document.createElement('option');
  dropDownItem.textContent = dropDownData;
  dropDownItem.value = index;
  dropDownList.appendChild(dropDownItem);

};

module.exports = MoviesDropDownView;
