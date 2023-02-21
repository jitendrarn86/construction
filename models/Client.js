const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    
    first_name: {
      type: String,
      required: true,
    },
	last_name: {
      type: String,
      required: true,
    },
	client_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
	phone: {
      type: String,
      required: false,
    },
	fax: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    
    image: {
      type: String,
      required: false,
    },   
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    

    status: {
      type: String,
      default: 'Show',
      enum: ['Show', 'Hide'],
    },
  },

  {
    timestamps: true,
  }
);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
