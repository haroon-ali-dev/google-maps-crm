const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 256
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 1024
    }
});

const User = mongoose.model("User", userSchema);

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(256).required(),
        password: Joi.string().min(3).max(15).required()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validate;