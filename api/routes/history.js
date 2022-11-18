const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { History, validate } = require("../model/history");


router.get("/:id", async (req, res) => {
  try {
    const histories = await History.find({ customerId: req.params.id });

    res.json({ message: "success", histories });
  } catch (error) {
    if (error) return res.status(500).json({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  // console.log(req.body);
  const { error } = validate(req.body);
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

module.exports = router;