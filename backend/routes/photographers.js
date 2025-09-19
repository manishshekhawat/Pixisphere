// routes/photographers.js
const express = require("express");
const router = express.Router();
const Photographer = require("../model/Photographer");

// GET all photographers
router.get("/", async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.json(photographers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single photographer by custom id OR _id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let photographer;

    // If param is numeric, search by custom "id" field
    if (!isNaN(id)) {
      photographer = await Photographer.findOne({ id: Number(id) });
    }

    // Otherwise, try MongoDB _id
    if (!photographer) {
      photographer = await Photographer.findById(id);
    }

    if (!photographer) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(photographer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
