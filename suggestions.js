const express = require("express");
const router = express.Router();
const upload = require("./multer");
const Suggestion = require("./Suggestion");

router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    try {
      // DEBUG (keep for now)
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      if (!req.file) {
        return res.status(400).json({
          error: "No image received. Key must be 'image'"
        });
      }

      const suggestion = new Suggestion({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.file.path
      });

      await suggestion.save();

      res.status(201).json({
        message: "Upload success",
        data: suggestion
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/", async (req, res) => {
  const data = await Suggestion.find().sort({ createdAt: -1 });
  res.json(data);
});

router.get("/category/:category", async (req, res) => {
  const data = await Suggestion.find({
    category: req.params.category
  });
  res.json(data);
});

module.exports = router;
