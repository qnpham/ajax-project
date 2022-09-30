/* exported data */
var data = {
  searchResult: [],
  movieView: { currentlyViewing: null, info: null },
  search: '',
  list: {
    viewing: false,
    array: []
  },
  pageView: 'home'
};
var userList = localStorage.getItem('userList');
if (userList) {
  data.list.array = JSON.parse(userList);
}

window.addEventListener('beforeunload', function () {

  this.localStorage.setItem('userList', JSON.stringify(data.list.array));
});
