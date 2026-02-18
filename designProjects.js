const express = require("express");
const router = express.Router();
const SavedDesignProject = require("./SavedDesignProject");

router.post("/save", async (req, res) => {
  try {
    const { projectName, selectedWall } = req.body;

    const newProject = new SavedDesignProject({
      projectName,
      selectedWall
    });

    await newProject.save();

    res.json({
      success: true,
      message: "Project saved successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error saving project"
    });
  }
});

module.exports = router;
