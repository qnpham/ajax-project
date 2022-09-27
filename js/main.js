var $form = document.querySelector('#home-form');
var $homePage = document.querySelector('[data-view="home-page"]');
var $nav = document.querySelector('[data-view="nav"]');
var $navHeader = document.querySelector('#nav-header');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  $homePage.classList.add('hidden');
  $nav.classList.remove('hidden');
});

$navHeader.addEventListener('click', function (event) {
  $homePage.classList.remove('hidden');
  $nav.classList.add('hidden');
});
