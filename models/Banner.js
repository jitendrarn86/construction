const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
	video_url: {
      type: String,
      required: false,
    },
   
    
    image: {
      type: String,
      required: true,
    },
     image1: {
      type: String,
      required: true,
    },
     image2: {
      type: String,
      required: true,
    },
     image3: {
      type: String,
      required: true,
    },
    
    
    
    description: {
      type: String,
      required: true,
    },
    

    
  },

  {
    timestamps: true,
  }
);

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
