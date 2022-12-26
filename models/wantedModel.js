const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const wantedSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post must have a title..."],
  },
  description: {
    type: String,
    required: [true, "Post must have a description..."],
  },
  name: {
    type: String,
    required: [true, "Post must have a author..."],
  },
  email: {
    type: String,
    required: [true, "Post must have a email..."],
  },
  phoneNumber: {
    type: String,
    required: [true, "Post must have a number"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: String,
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

wantedSchema.pre(/^save/, function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });
  next();
});

wantedSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -passwordChangedAt -password",
  });
  next();
});

const Wanted = mongoose.model("Wanted", wantedSchema);

module.exports = Wanted;
