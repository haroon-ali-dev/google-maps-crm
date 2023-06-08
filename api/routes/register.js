const express = require("express");
const router = express.Router();
const { User, validate } = require("../model/user");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    user = new User({
        email: req.body.email,
        password
    });
    await user.save();

    res.send("ok");
});

module.exports = router;