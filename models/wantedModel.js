const mongoose = require("mongoose");

const wantedSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});
