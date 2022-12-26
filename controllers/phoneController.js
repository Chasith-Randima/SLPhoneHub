const Phone = require("./../models/phoneModel");
const factory = require("./handlerFactory");

exports.createOnePhone = factory.createOne(Phone, "phone");
exports.getOnePhone = factory.getOne(Phone);
// exports.getOnePhone = factory.getOne(Phone, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllPhones = factory.getAll(Phone);
exports.updateAPhone = factory.updateOne(Phone);
exports.deleteAPhone = factory.deleteOne(Phone);
