const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

// accessories schema

const accessorySchema = new mongoose.Schema({
  condition: {
    type: String,
    required: [true, "accessory must have a condition..."],
  },
  itemType: {
    type: String,
    required: [true, "accessory must have a condition..."],
  },
  brand: {
    type: String,
    required: [true, "accessory must have a brand..."],
  },
  title: {
    type: String,
    required: [true, "accessory must have a title..."],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  negotiable: {
    type: String,
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: String,
  phoneNumber: String,
  location: String,
});

accessorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });

  next();
});

accessorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -passwordChangedAt -password",
  });
  next();
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
