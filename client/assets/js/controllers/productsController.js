app.controller('productsController', ['$scope', 'productFactory', '$cookies', '$location', 'bidFactory', '$window', function($scope, productFactory, $cookies, $location, bidFactory, $window){

  $scope.userInSession = $cookies.getObject('user');
  $scope.username = $scope.userInSession.first_name;

  if ($location.url() == '/bids' && typeof($scope.userInSession)=='undefined'){
    $location.url('/');
  }
  if ($location.url() == '/results' && typeof($scope.userInSession)=='undefined'){
    $location.url('/');
  }

  $scope.logout = function(){
    $cookies.remove('user');
    $location.url('/');
  }

  var getAllProducts = function(){
    productFactory.index(function(returnedData){
      $scope.allProducts = returnedData;
    });
  };

  getAllProducts();

  $scope.create = function(){
    productFactory.create($scope.newProduct, function(returnedData){
      var product = returnedData;
      $location.url('/bids');
    });
  };

  $scope.endBid = function(){
    var allProducts = $scope.allProducts;
    for (var key in allProducts){
      if(allProducts[key].bids.length == 0){
        $window.alert("Cannot end the Bid. Some products do not have any bids yet.")
        return;
      }
    }
    return $location.url('/results');
  };

  $scope.restart = function(){
    productFactory.restart(function(returnedData){
      var data = returedData;
    });
    $location.url('/bids');
  };



}])
