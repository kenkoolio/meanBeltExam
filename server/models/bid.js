var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bidSchema = new mongoose.Schema({
  _user: {type: String},
  _product: {type: Schema.Types.ObjectId, ref: 'Product'},
  amount: {
    type: Number,
    required: true,
    min: 1
  }
}, {timestamps: true});

mongoose.model('Bid', bidSchema);
