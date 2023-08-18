const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 256
  },
  postCode: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validate(customer) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(256).required(),
    postCode: Joi.string().min(3).max(10).required()
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validate;