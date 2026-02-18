const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  designerName: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CommunityDesign", communitySchema);
