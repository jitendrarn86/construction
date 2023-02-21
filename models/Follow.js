const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    from_user: {
      type: String,
      required: false,
    },
    to_user: {
      type: String,
      required: false,
    },
    is_liked: {
      type: Number,
      required: false,
    },
    is_followed: {
      type: Number,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const Follow = mongoose.models.Follow || mongoose.model('Follow', followSchema);

module.exports = Follow;
