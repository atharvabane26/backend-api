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

router.get("/all", async (req, res) => {
  try {
    const projects = await SavedDesignProject
      .find()
      .sort({ createdAt: -1 }); // latest first

    res.json(projects);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching projects"
    });
  }
});

module.exports = router;
