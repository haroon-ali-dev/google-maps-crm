const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/user");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: "Invalid email or password." });

    res.send("ok");
});

module.exports = router;