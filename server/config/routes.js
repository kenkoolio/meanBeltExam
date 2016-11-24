var Users = require('../controllers/users.js');
var Products = require('../controllers/products.js');
var Bids = require('../controllers/bids.js');

module.exports = (function(app){
  app.get('/users', Users.index);
  app.post('/users', Users.create);
  app.post('/login', Users.login);
  app.get('/products', Products.index);
  app.post('/products', Products.create);
  app.post('/bids', Bids.create);
  app.get('/products/:id', Products.show);
  app.delete('/bids', Bids.delete);
});
