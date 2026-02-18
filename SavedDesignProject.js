const mongoose = require("mongoose");

const savedDesignProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  selectedWall: {
    type: String,
    required: true,
    enum: ["Wall 1", "Wall 2", "Wall 3"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SavedDesignProject", savedDesignProjectSchema);
