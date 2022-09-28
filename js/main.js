var $homeForm = document.querySelector('#home-form');
var $homePage = document.querySelector('[data-view="home-page"]');
var $nav = document.querySelector('[data-view="nav"]');
var $navHeader = document.querySelector('#nav-header');
var $searchResult = document.querySelector('[data-view="search-result"]');
var $main = document.querySelector('main');
var $navForm = document.querySelector('#nav-form');

$navHeader.addEventListener('click', function (event) {
  $homePage.classList.remove('hidden');
  $nav.classList.add('hidden');
  $searchResult.classList.add('hidden');
});

$navForm.addEventListener('submit', function (event) {
  var $navInput = document.querySelector('#nav-input');
  var keyword = $navInput.value;
  event.preventDefault();
  getApi(keyword);
});

$homeForm.addEventListener('submit', function (event) {
  var $homeInput = document.querySelector('#home-input');
  var keyword = $homeInput.value;
  event.preventDefault();
  $homePage.classList.add('hidden');
  $nav.classList.remove('hidden');
  getApi(keyword);

});

function getApi(keyword) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://omdbapi.com/?apikey=e9abc53b&s=' + keyword);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.Search.length; i++) {
      data.searchResult.push(xhr.response.Search[i]);
    }
    $main.appendChild(createImage());
  });
  xhr.send();
}

function createImage() {
  var container = document.createElement('div');
  container.setAttribute('class', 'container');
  container.setAttribute('data-view', 'search-result');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  container.appendChild(row);

  for (var i = 0; i < data.searchResult.length; i++) {
    row.appendChild(createColumn(i));
  }

  function createColumn(index) {
    var column = document.createElement('div');
    column.setAttribute('class', 'column-one-third text-center');
    var img = document.createElement('img');
    img.setAttribute('src', data.searchResult[index].Poster);
    column.appendChild(img);
    return column;
  }
  container.appendChild(row);
  return container;

}
createImage();
