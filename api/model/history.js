const mongoose = require("mongoose");
const Joi = require("joi");

const historySchema = new mongoose.Schema({
  customerId: {
    type: mongoose.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  info: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500
  }
});

const History = mongoose.model("History", historySchema);

function validate(customer) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    date: Joi.date().required(),
    info: Joi.string().min(3).max(500).required()
  });

  return schema.validate(customer);
}

module.exports.History = History;
module.exports.validate = validate;