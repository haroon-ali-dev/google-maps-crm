const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../model/customer");

router.post("/", async (req, res) => {
  // console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const customer = new Customer(req.body);
    await customer.save();

    res.json({ message: "success", customer });
  } catch (error) {
    if (error) return res.status(500).json({ message: error.message });
  }
});

module.exports = router;