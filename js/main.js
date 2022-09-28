var $form = document.querySelector('#home-form');
var $homePage = document.querySelector('[data-view="home-page"]');
var $nav = document.querySelector('[data-view="nav"]');
var $navHeader = document.querySelector('#nav-header');
var $searchResult = document.querySelector('[data-view="search-result"]');

$navHeader.addEventListener('click', function (event) {
  $homePage.classList.remove('hidden');
  $nav.classList.add('hidden');
  $searchResult.classList.add('hidden');
});

$form.addEventListener('submit', function (event) {
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
  });
  xhr.send();
}
