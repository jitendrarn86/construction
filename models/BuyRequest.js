const mongoose = require('mongoose');

const BuyRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
   
	 wallet_address: {
      type: String,
      required: false,
    },
	
	
	description: {
      type: String,
      required: false,
    },
	
	
	nftid: {
      type: String,
      required: false,
    },
	
	
  },
  {
    timestamps: true,
  }
);

const BuyRequest = mongoose.models.BuyRequest || mongoose.model('BuyRequest', BuyRequestSchema);

module.exports = BuyRequest;
