app.controller('bidsController', ['$scope', 'productFactory', '$cookies', '$location', 'bidFactory', '$window', function($scope, productFactory, $cookies, $location, bidFactory, $window){
  var self = this;
  var userInSession = $cookies.getObject('user');
  var username = userInSession.first_name;

  $scope.submitBid = function(){
    $scope.bidError = [];
    // if (typeof($scope.bidAmt) == 'undefined'){
    //   $scope.bidError.push("You must enter a bid amount");
    // };
    productFactory.show($scope.productId, function(returnedData){
      $scope.singleProduct = returnedData;
    });

    console.log($scope.singleProduct);

    // var allBidsArr = $scope.singleProduct.bids;
    var allBids = [];
    for (var key in allBidsArr){
      allBids.push(allBidsArr[key].amount);
    }
    var maxBid = Math.max(allBids);
    console.log(maxBid);



    if($scope.bidAmt <= maxBid){
      $window.alert('Bid amount should be higher than the previous bid');
    } else {
      var newBid = {
        _user: username,
        _product: $scope.productId,
        amount: $scope.bidAmt
      };

      bidFactory.create(newBid, function(returnedData){
        if (typeof(returnedData.Error)!=='undefined'){
          var errors = returnedData.Error.errors;
          $scope.bidError = [];
          for (var key in errors){
            if (errors.hasOwnProperty(key)){
              $scope.bidError.push(errors[key].message);
            };
          };
        } else if (typeof(returnedData.Success)!=='undefined'){
          location.reload();
          var data = returnedData;
        };
      });

      };
  };




}]);
