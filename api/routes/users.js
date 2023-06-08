const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../model/customer");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  res.send("ok");
});

module.exports = router;