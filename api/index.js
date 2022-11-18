const customers = require("./routes/customers");
const history = require("./routes/history");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customers);
app.use("/api/histories", history);

const port = process.env.PORT || 3001;
app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);

  try {
    await mongoose.connect("mongodb://localhost:27017/crm");
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Error connecting to MongoDB...")
  }
});