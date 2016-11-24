var mongoose = require('mongoose');
var Product = mongoose.model('Product');

function ProductsController(){
  this.index = function(req, res){
    Product.find({}).populate('bids').exec(function(err, products){
      if(err){
        res.json(err);
      } else {
        res.json(products);
      };
    });
  };

  this.create = function(req, res){
    var newProduct = new Product(req.body);
    newProduct.save(function(err, product){
      if(err){
        console.log(err);
      } else {
        res.json(product);
      };
    });
  };

  this.show = function(req, res){
    var productId = req.params.id;
    Product.findOne({_id: productId}).populate('bids').exec(function(err, product){
      if(err){
        console.log(err);
      } else {
        res.json(product);
      };
    });
  };
};

module.exports = new ProductsController();
