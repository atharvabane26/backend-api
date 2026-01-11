const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Suggestion = require("../models/Suggestion");

// Upload image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const suggestion = new Suggestion({
      title: req.body.title,
      category: req.body.category,
      imageUrl: req.file.path
    });

    await suggestion.save();
    res.json({ message: "Image uploaded successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all images
router.get("/", async (req, res) => {
  const data = await Suggestion.find();
  res.json(data);
});

module.exports = router;
