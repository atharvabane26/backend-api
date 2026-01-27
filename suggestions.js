const express = require("express");
const router = express.Router();
const upload = require("./multer");
const Suggestion = require("./Suggestion");


// =======================
// 1️⃣ Upload suggestion (Admin)
// =======================
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // check image
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const suggestion = new Suggestion({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      imageUrl: req.file.path // Cloudinary URL
    });

    await suggestion.save();

    res.status(201).json({
      message: "Suggestion uploaded successfully",
      data: suggestion
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =======================
// 2️⃣ Get ALL suggestions (Unity)
// =======================
router.get("/", async (req, res) => {
  try {
    const data = await Suggestion.find()
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// =======================
// 3️⃣ Get suggestions by CATEGORY (Unity)
// =======================
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const data = await Suggestion.find({ category });

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
