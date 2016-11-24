app.factory('bidFactory', ['$http', function($http){

 function BidFactory(){

   this.create = function(newBid, callback){
     $http.post('/bids', newBid).then(function(returnedData){
       if(typeof(returnedData.data.Error)!=='undefined'){
         if(typeof(callback)=='function'){
           callback({'Error ': returnedData.data.Error});
         };
       } else if (typeof(returnedData.data.Success)!== 'undefined'){
         if(typeof(callback)=='function'){
           callback({'Success': returnedData.data.Success});
         };
       };
     });
   };


 };

 return new BidFactory();
}]);
