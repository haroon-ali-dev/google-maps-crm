const mongoose = require("mongoose");

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
    }
});

const Customer = mongoose.model("Customer", customerSchema);

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

async function seed() {
    await mongoose.connect("mongodb://127.0.0.1:27017/crm");

    await User.deleteMany({});
    await Customer.deleteMany({});
    await History.deleteMany({});

    const user = new User({ email: "haroon2@gmail.com", password: "password321" });
    await user.save();
}

module.exports.seed = seed;