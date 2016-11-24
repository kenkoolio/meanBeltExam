var mongoose = require('mongoose');
var Bid = mongoose.model('Bid');
var Product = mongoose.model('Product');

function BidsController(){
  this.create = function(req, res){
    Product.findOne({_id: req.body._product}, function(err, product){
      var newBid = new Bid();
      newBid._user = req.body._user;
      newBid._product = product._id;
      newBid.amount = req.body.amount;
      newBid.save(function(err, bid){
        if(err){
          res.json({'Error': err});
        } else {
          product.bids.push(newBid);
          product.save(function(err, product){
            if(err){
              console.log(err);
            } else {
              res.json({'Success': bid});
            };
          });
        };
      });
    });
  };

  this.delete = function(req, res){
    Bid.remove({}, function(err){
      Product.update({}, {$set: {bids: []}}, {multi:true});
    });
  };


};

module.exports = new BidsController();
