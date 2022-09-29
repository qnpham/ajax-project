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
var $check = document.querySelector('.fa-check');
var $list = document.querySelector('[data-item="list"]');
var $listBtn = document.querySelector('[data-item="list-btn"]');

$list.addEventListener('click', viewList);
$listBtn.addEventListener('click', viewList);

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
  data.pageView = 'home';
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
  data.pageView = 'search';

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
  container.setAttribute('class', 'container text-center');
  container.setAttribute('data-view', 'search-result');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  for (var i = 0; i < data.searchResult.length; i++) {
    row.appendChild(createColumn(i));
  }

  function createColumn(index) {
    var column = document.createElement('div');
    column.setAttribute('class', 'column-one-third margin-auto');
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
        data.movieView.currentlyViewing = (data.searchResult[i]);
        checkList();
        getDetails(data.movieView.currentlyViewing.imdbID);
      }
    }
  }
  if (data.list.viewing === true) {
    $plus.classList.add('hidden');
    $check.classList.add('hidden');
  }

  if (event.target.getAttribute('id') === 'list-close') {
    closeList();
  }
});

$close.addEventListener('click', function () {
  var $searchResult = document.querySelector('[data-view="search-result"]');
  $moviePage.classList.add('hidden');
  $navForm.classList.remove('hidden');
  $searchResult.classList.remove('hidden');
  $plus.classList.remove('hidden');
  $check.classList.add('hidden');
});

function getDetails(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://omdbapi.com/?apikey=e9abc53b&i=' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.movieView.info = xhr.response;
    setMoviePage(data.movieView.info);
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
  $moviePage.classList.remove('hidden');
  $navForm.classList.add('hidden');
  $searchResult.classList.add('hidden');
}

$plus.addEventListener('click', function () {
  data.list.array.unshift(data.movieView.currentlyViewing);
  checkList();
});

function checkList() {
  for (var i = 0; i < data.list.array.length; i++) {
    if (data.movieView.currentlyViewing.imdbID === data.list.array[i].imdbID) {
      $plus.classList.add('hidden');
      $check.classList.remove('hidden');
    }
  }
}

function viewList() {
  var $searchResult = document.querySelector('[data-view="search-result"]');
  data.list.viewing = true;
  $navForm.classList.add('hidden');
  $homePage.classList.add('hidden');
  $nav.classList.remove('hidden');
  if ($searchResult) {
    $searchResult.classList.add('hidden');
  }
  $main.appendChild(createList());
}

function createList() {
  var tempList = data.list.array;
  var container = document.createElement('div');
  container.setAttribute('class', 'container text-center');
  container.setAttribute('data-view', 'list-page');

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  var columnOneFourth = document.createElement('div');
  columnOneFourth.className = 'column-one-fourth';
  row.appendChild(columnOneFourth);

  var close = document.createElement('i');
  close.className = 'fa-solid fa-xmark';
  close.setAttribute('id', 'list-close');
  columnOneFourth.appendChild(close);

  var row2 = document.createElement('div');
  row2.className = 'row';

  for (var i = 0; i < tempList.length; i++) {
    row2.appendChild(createColumn(i));
  }

  function createColumn(index) {
    var column = document.createElement('div');
    column.setAttribute('class', 'column-one-third margin-auto');
    var img = document.createElement('img');
    img.setAttribute('src', tempList[index].Poster);
    column.appendChild(img);
    return column;
  }
  container.appendChild(row);
  container.appendChild(row2);
  return container;
}

function closeList() {
  var $listPage = document.querySelector('[data-view="list-page"]');
  var $searchResult = document.querySelector('[data-view="search-result"]');

  $listPage.remove();
  if (data.pageView === 'home') {
    $homePage.classList.remove('hidden');
    $nav.classList.add('hidden');
  } else if (data.pageView === 'search') {
    $navForm.classList.remove('hidden');
    $searchResult.classList.remove('hidden');
  }
}
