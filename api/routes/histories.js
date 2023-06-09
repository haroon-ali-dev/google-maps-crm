const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { History, validateCreate, validateUpdate } = require("../model/history");
const auth = require("../middleware/auth");

router.get("/:id", auth, async (req, res) => {
  try {
    const history = await History.findOne({ _id: req.params.id });

    res.json({ message: "success", history });
  } catch (error) {
    if (error) return res.status(500).json({ message: error.message });
  }
});

router.get("/customer/:id", auth, async (req, res) => {
  try {
    const histories = await History.find({ customerId: req.params.id });

    res.json({ message: "success", histories });
  } catch (error) {
    if (error) return res.status(500).json({ message: error.message });
  }
});

router.post("/:id", auth, async (req, res) => {
  const { error } = validateCreate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const history = new History({
      customerId: mongoose.Types.ObjectId(req.body.customerId),
      date: req.body.date,
      info: req.body.info
    });
    await history.save();

    res.json({ message: "success", history });
  } catch (error) {
    if (error) return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    await History.findByIdAndUpdate(req.params.id, {
      date: req.body.date,
      info: req.body.info
    });

    res.json({ message: "success" });
  } catch (error) {
    if (error) return res.status(500).json({ message: error.message });
  }
});

module.exports = router;