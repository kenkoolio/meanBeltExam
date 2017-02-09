app.controller('bidsController', ['$scope', 'productFactory', '$cookies', '$location', 'bidFactory', '$window', function($scope, productFactory, $cookies, $location, bidFactory, $window){
  var self = this;
  var userInSession = $cookies.getObject('user');
  var username = userInSession.first_name;

  $scope.submitBid = function(){
    $scope.bidError = [];
    // if (typeof($scope.bidAmt) == 'undefined'){
    //   $scope.bidError.push("You must enter a bid amount");
    // };
    function getProduct(callback){
      productFactory.show($scope.productId, function(returnedData){
        $scope.singleProduct = returnedData;
        callback();
      });
    };

    getProduct(function(){
      var maxBid = 0;
      console.log($scope.singleProduct);

      var allBidsArr = $scope.singleProduct.bids;
      console.log(allBidsArr);
      var allBids = [];
      for (var i=0; i<allBidsArr.length; i++){
        allBids.push(allBidsArr[i].amount);
      };
      maxBid = Math.max(...allBids);
      console.log(allBids);
      console.log(maxBid);


      if(typeof($scope.bidAmt)=='undefined'){
        $window.alert('Bid field cannot be blank!');
      } else if((typeof($scope.bidAmt)!== 'undefined') && ($scope.bidAmt <= maxBid)){
        $window.alert('Bid amount should be higher than the previous bid');
      } else if(($scope.bidAmt > maxBid) && (typeof($scope.bidAmt) !== 'undefined')){
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

    });

  };




}]);
