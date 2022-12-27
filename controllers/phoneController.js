const Phone = require("./../models/phoneModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image,Please upload only an Image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoneImages = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizePhoneImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next();

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `phone-${req.user._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/phones/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.createOnePhone = factory.createOne(Phone, "phone");
exports.getOnePhone = factory.getOne(Phone);
// exports.getOnePhone = factory.getOne(Phone, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllPhones = factory.getAll(Phone);
exports.updateAPhone = factory.updateOne(Phone);
exports.deleteAPhone = factory.deleteOne(Phone);
