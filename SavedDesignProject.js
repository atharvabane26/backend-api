const mongoose = require("mongoose");

const savedDesignProjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  selectedWall: {
    type: String,
    required: true,
    enum: ["Wall1", "Wall2", "Wall3"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SavedDesignProject", savedDesignProjectSchema);
