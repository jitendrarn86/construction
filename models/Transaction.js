const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
	 wallet_address: {
      type: String,
      required: false,
    },
	 contact_address: {
      type: String,
      required: false,
    },
	type: {
      type: String,
      required: false,
    },
	price: {
      type: String,
      required: false,
    },
	nftid: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
	
	userwallet: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: false,      
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
	first_name: {
      type: String,
      required: false,
    },
	last_name: {
      type: String,
      required: false,
    },
	description: {
      type: String,
      required: false,
    },
	gender: {
      type: String,
      required: false,
    },
	dob: {
      type: String,
      required: false,
    },
	username: {
      type: String,
      required: false,
    },
	userimage: {
      type: String,
      required: false,
    },
	userfullname: {
      type: String,
      required: false,
    },
	contractid: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
