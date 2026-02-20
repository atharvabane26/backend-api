const express = require("express");
const router = express.Router();
const SavedDesignProject = require("./SavedDesignProject");

// Save project with userId
router.post("/save", async (req, res) => {
  try {
    const { projectName, selectedWall, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }

    const newProject = new SavedDesignProject({
      userId,
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

// Get only projects belonging to this user
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await SavedDesignProject
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching projects"
    });
  }
});

module.exports = router;
