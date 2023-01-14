const Accessory = require("./../models/accessoriesModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image plase upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadAccessoryImages = upload.fields([
  { name: "images", maxCount: 5 },
]);

exports.resizeAccessoryImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next();

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `accessory-${req.user._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2400, 1600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/accessories/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.getImage = catchAsync(async (req, res) => {
  let fileName = req.params.imageName;
  // console.log(path.join(__dirname, "../public/img/accessories"));
  // console.log(req.params);
  let options = {
    root: path.join(__dirname, "../public/img/accessories"),
    // path: `public/img/phones/${req.params.name}`,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  // res.status(200).json({});
  res.sendFile(fileName, options, function (err) {
    if (err) {
      // next(err)
      console.log(err);
      res.status(500).json({
        err,
      });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

exports.getAllAccessories = factory.getAll(Accessory);
exports.getOneAccessory = factory.getOne(Accessory);
exports.createOneAccessory = factory.createOne(Accessory, "Accessory");
exports.updateOneAccessory = factory.updateOne(Accessory);
exports.deleteOneAccessory = factory.deleteOne(Accessory);
