const express = require("express");
const router = express.Router();
const upload = require("./multer");
const CommunityDesign = require("./communityModel");


// 🔥 ADMIN IMAGE + DATA UPLOAD
router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      if (!req.file) {
        return res.status(400).json({
          error: "No image uploaded. Field name must be 'image'"
        });
      }

      const community = new CommunityDesign({
        designerName: req.body.designerName,
        caption: req.body.caption,
        imageUrl: req.file.path
      });

      await community.save();

      res.status(201).json({
        message: "Community design uploaded successfully",
        data: community
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Upload failed",
        details: err.message
      });
    }
  }
);


// 🔥 FETCH ALL COMMUNITY DESIGNS (Unity use this)
router.get("/", async (req, res) => {
  try {
    const data = await CommunityDesign
      .find()
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
