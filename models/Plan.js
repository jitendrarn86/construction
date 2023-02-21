const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    
    image: {
      type: String,
      required: true,
    },
    
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    
    description: {
      type: String,
      required: true,
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

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
