const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
	  unique: false,
    },
    image: {
      type: String,
      required: false,
	  unique: false,
    },
    banner: {
      type: String,
      required: false,
	  unique: false,
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
	  unique: false,
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
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//const User = mongoose.models.User || mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);

module.exports = User;
