const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: "Invalid email or password." });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.jwtPrivateKey);

    res.json({ token });
});

module.exports = router;