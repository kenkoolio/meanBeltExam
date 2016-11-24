var app = angular.module('app', ['ngRoute','ngCookies']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: "/partials/loginRegistration.html"
  })
  .when('/results', {
    templateUrl: "/partials/results.html",
    controller: "productsController"
  })
  .when('/bids', {
    templateUrl: '/partials/bids.html',
    controller: "productsController"
  })
  .when('/addproducts', {
    templateUrl: '/partials/product.html',
    controller: 'productsController'
  })
  .otherwise({
    redirectTo: '/'
  });
});
