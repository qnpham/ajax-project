var $homeForm = document.querySelector('#home-form');
var $homePage = document.querySelector('[data-view="home-page"]');
var $nav = document.querySelector('[data-view="nav"]');
var $navHeader = document.querySelector('#nav-header');
var $main = document.querySelector('main');
var $navForm = document.querySelector('#nav-form');

$navHeader.addEventListener('click', function (event) {
  var $container = document.querySelectorAll('.container');
  var $searchResult = document.querySelector('[data-view="search-result"]');
  if ($searchResult) {
    $searchResult.remove();
    data.searchResult = [];
  }
  for (var i = 0; i < $container.length; i++) {
    $container[i].classList.add('hidden');
  }
  $homePage.classList.remove('hidden');
  $homeForm.reset();
  $navForm.reset();
});

$navForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var $searchResult = document.querySelector('[data-view="search-result"]');
  var $navInput = document.querySelector('#nav-input');
  data.search = $navInput.value;
  if ($searchResult) {
    $searchResult.remove();
  }
  getApi(data.search);
});

$homeForm.addEventListener('submit', function (event) {
  var $navInput = document.querySelector('#nav-input');
  var $homeInput = document.querySelector('#home-input');
  data.search = $homeInput.value;
  event.preventDefault();
  $homePage.classList.add('hidden');
  $nav.classList.remove('hidden');
  $navInput.value = data.search;
  getApi(data.search);

});

function getApi(keyword) {
  data.searchResult = [];
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
