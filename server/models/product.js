var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  img: {
    type: String,
    required: true
  },

  bids: [{type: Schema.Types.ObjectId, ref: 'Bid'}]

}, {timestamps: true});

mongoose.model('Product', productSchema);
