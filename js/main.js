var $homeForm = document.querySelector('#home-form');
var $homePage = document.querySelector('[data-view="home-page"]');
var $nav = document.querySelector('[data-view="nav"]');
var $navHeader = document.querySelector('#nav-header');
var $main = document.querySelector('main');
var $navForm = document.querySelector('#nav-form');
var $body = document.querySelector('body');
var $moviePage = document.querySelector('[data-view="movie-page"]');
var $close = document.querySelector('.fa-xmark');
var $plus = document.querySelector('.fa-plus');
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
  $navForm.classList.remove('hidden');
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
$body.addEventListener('click', function (event) {
  if (event.target.matches('img')) {
    for (var i = 0; i < data.searchResult.length; i++) {
      if (data.searchResult[i].Poster === event.target.getAttribute('src')) {
        data.viewing.search = (data.searchResult[i]);
        getDetails(data.viewing.search.imdbID);
      }
    }
  }
});

$close.addEventListener('click', function () {
  var $searchResult = document.querySelector('[data-view="search-result"]');
  $moviePage.classList.add('hidden');
  $navForm.classList.remove('hidden');
  $searchResult.classList.remove('hidden');
});

function getDetails(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://omdbapi.com/?apikey=e9abc53b&i=' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.viewing.result = xhr.response;
    setMoviePage(data.viewing.result);
    showMoviePage();
  });
  xhr.send();
}

function setMoviePage(movie) {
  var $movieTitle = document.querySelector('#movie-title');
  var $movieDirector = document.querySelector('#movie-director');
  var $rated = document.querySelector('#rated');
  var $score = document.querySelector('#score');
  var $genre = document.querySelector('#genre');
  var $actors = document.querySelector('#actors');
  var $plot = document.querySelector('#plot');
  var $img = document.querySelector('.movie-page-img');

  $movieTitle.textContent = movie.Title;
  $movieDirector.textContent = 'Directed by ' + movie.Director;
  $rated.textContent = movie.Rated;
  $genre.textContent = movie.Genre;
  $actors.textContent = movie.Actors;
  $plot.textContent = movie.Plot;
  $img.setAttribute('src', movie.Poster);

  for (var i = 0; i < movie.Ratings.length; i++) {
    if (movie.Ratings[i].Source === 'Internet Movie Database') {
      $score.textContent = movie.Ratings[i].Value;
    }
  }
}

function showMoviePage() {
  var $searchResult = document.querySelector('[data-view="search-result"]');
  if (data.viewing.result !== null) {
    $moviePage.classList.remove('hidden');
    $navForm.classList.add('hidden');
    $searchResult.classList.add('hidden');
  }
}

$plus.addEventListener('click', function () {

});
