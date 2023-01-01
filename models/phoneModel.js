const mongoose = require("mongoose");
const slugify = require("slugify");

// phone schema

const phoneSchema = new mongoose.Schema(
  {
    condition: {
      type: String,
      required: [true, "Phone must have a condition..."],
    },
    brandname: {
      type: String,
      required: [true, "Phone must have a brand name..."],
    },
    model: {
      type: String,
      required: [true, "Phone must have a model..."],
    },
    slug: {
      type: String,
    },
    network: {
      type: String,
    },
    sim: {
      type: String,
    },
    os: {
      type: String,
    },
    memory: {
      type: String,
    },
    main_camera: {
      type: String,
    },
    selfie_camera: {
      type: String,
    },
    sound: {
      type: String,
    },
    wifi: {
      type: String,
    },
    bluetooth: {
      type: String,
    },
    radio: {
      type: String,
    },
    usb: {
      type: String,
    },
    sensors: {
      type: String,
    },
    location: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    price: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    images: [String],
    description: String,
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  }
  // { typeKey: "$type" }
);

phoneSchema.pre("save", function (next) {
  this.slug = slugify(`${this.brandname}_${this.model}_${this.condition}`, {
    lower: true,
  });
  next();
});

phoneSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -passwordChangedAt -password",
  });
  next();
});

// phoneSchema.virtual("user_virtual", {
//   ref: "User",
//   foreignField: "_id",
//   localField: "user",
// });

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
