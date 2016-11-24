app.factory('productFactory', ['$http', function($http){
  function ProductFactory(){
    this.index = function(callback){
      $http.get('/products').then(function(returnedData){
        if(typeof(callback)=='function'){
          callback(returnedData.data);
        }
      });
    };

    this.show = function(productId, callback){
      $http.get('/products/'+productId).then(function(returnedData){
        if(typeof(callback)=='function'){
          callback(returnedData.data);
        };
      });
    };

    this.create = function(product, callback){
      $http.post('/products', product).then(function(returnedData){
        if(typeof(callback)=='function'){
          callback(returnedData.data);
        };
      });
    };

    this.restart = function(callback){
      $http.delete('/bids').then(function(returnedData){
        if(typeof(callback)=='function'){
          callback(returnedData);
        };
      });
    };

  };

  return new ProductFactory();
}]);
