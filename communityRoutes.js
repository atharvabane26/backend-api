const express = require("express");
const router = express.Router();
const CommunityDesign = require("./communityModel");


// 🔥 POST - Admin uploads design
router.post("/", async (req, res) => {
  try {
    const { designerName, imageUrl, caption } = req.body;

    const newDesign = new CommunityDesign({
      designerName,
      imageUrl,
      caption
    });

    await newDesign.save();

    res.status(201).json(newDesign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 GET - Unity app fetches data
router.get("/", async (req, res) => {
  try {
    const designs = await CommunityDesign
      .find()
      .sort({ createdAt: -1 });

    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
